import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import si from "systeminformation";
import { z } from "zod";
import { exec, execFile } from "child_process";
import util from "util";
import { writeFile, readFile, readdir, stat } from "fs/promises";
import path from "path";
import os from "os";

const execAsync = util.promisify(exec);
const execFileAsync = util.promisify(execFile);

const escapeAppleScriptString = (value: string) => value.replace(/"/g, '\\"');

// Initialize the Server
const server = new McpServer({
  name: "heimdall-mcp",
  version: "0.2.0",
});

// ============================================
// SYSTEM MONITORING
// ============================================

server.tool(
  "get_battery",
  "Get battery status including percentage, charging state, and estimated remaining time",
  {},
  async () => {
    try {
      const battery = await si.battery();
      const status = battery.isCharging ? "Charging" : "Discharging";
      const timeRemaining = battery.timeRemaining ? `${battery.timeRemaining} mins` : "N/A";
      
      return {
        content: [
          {
            type: "text",
            text: `Battery: ${battery.percent}%, ${status}, Remaining: ${timeRemaining}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading battery: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_cpu_load",
  "Get current CPU load percentage",
  {},
  async () => {
    try {
      const load = await si.currentLoad();
      return {
        content: [
          {
            type: "text",
            text: `CPU Load: ${load.currentLoad.toFixed(2)}%`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading CPU load: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_memory_usage",
  "Get current RAM usage in GB",
  {},
  async () => {
    try {
      const mem = await si.mem();
      const usedGB = (mem.active / 1024 ** 3).toFixed(2);
      const totalGB = (mem.total / 1024 ** 3).toFixed(2);
      const usedPercent = ((mem.active / mem.total) * 100).toFixed(1);
      
      return {
        content: [
          {
            type: "text",
            text: `RAM: ${usedGB}GB / ${totalGB}GB (${usedPercent}% used)`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading memory: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_system_info",
  "Get comprehensive system information including OS, CPU, and hostname",
  {},
  async () => {
    try {
      const osInfo = await si.osInfo();
      const cpu = await si.cpu();
      const hostname = os.hostname();
      
      return {
        content: [
          {
            type: "text",
            text: `System: ${osInfo.distro} ${osInfo.release}\nHostname: ${hostname}\nCPU: ${cpu.brand} (${cpu.cores} cores)`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading system info: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// SYSTEM ACTIONS
// ============================================

server.tool(
  "speak_message",
  "Speak a message out loud using macOS text-to-speech",
  { message: z.string().describe("The message to speak aloud") },
  async ({ message }) => {
    try {
      await execFileAsync("say", [message]);
      return {
        content: [
          {
            type: "text",
            text: `Spoken: "${message}"`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error speaking message: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "take_screenshot",
  "Capture a screenshot of the current screen (requires Screen Recording permission)",
  {},
  async () => {
    try {
      const screenshotPath = "/tmp/heimdall_screenshot.png";
      await execFileAsync("screencapture", ["-x", screenshotPath]);
      
      return {
        content: [
          {
            type: "text",
            text: `Screenshot saved to ${screenshotPath}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error taking screenshot: ${error instanceof Error ? error.message : "Unknown error"}\n\nMake sure Screen Recording permission is enabled in System Settings → Privacy & Security → Screen Recording`,
          },
        ],
      };
    }
  }
);

// ============================================
// CLIPBOARD & FILES
// ============================================

server.tool(
  "read_clipboard",
  "Read the current text content from the clipboard",
  {},
  async () => {
    try {
      const { stdout } = await execAsync("pbpaste");
      return {
        content: [
          {
            type: "text",
            text: stdout || "Clipboard is empty",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading clipboard: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "write_to_clipboard",
  "Copy text to the clipboard",
  { text: z.string().describe("The text to copy to clipboard") },
  async ({ text }) => {
    try {
      const proc = Bun.spawn(["pbcopy"], { stdin: new Response(text) });
      await proc.exited;
      return {
        content: [
          {
            type: "text",
            text: "Text copied to clipboard successfully",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error writing to clipboard: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "save_to_desktop",
  "Save text content to a file on the Desktop",
  {
    filename: z.string().describe("The name of the file to create"),
    content: z.string().describe("The content to write to the file"),
  },
  async ({ filename, content }) => {
    try {
      const filePath = path.join(os.homedir(), "Desktop", filename);
      await writeFile(filePath, content);
      return {
        content: [
          {
            type: "text",
            text: `File saved to ${filePath}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error saving file: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "read_file_from_desktop",
  "Read the contents of a file from the Desktop",
  { filename: z.string().describe("The name of the file to read") },
  async ({ filename }) => {
    try {
      const filePath = path.join(os.homedir(), "Desktop", filename);
      const content = await readFile(filePath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: `Contents of ${filename}:\n\n${content}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading file: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "list_desktop_files",
  "List all files and folders on the Desktop",
  {},
  async () => {
    try {
      const desktopPath = path.join(os.homedir(), "Desktop");
      const files = await readdir(desktopPath);
      return {
        content: [
          {
            type: "text",
            text: `Desktop contents:\n${files.join('\n')}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing files: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_file_info",
  "Get detailed information about a file on the Desktop",
  { filename: z.string().describe("The name of the file") },
  async ({ filename }) => {
    try {
      const filePath = path.join(os.homedir(), "Desktop", filename);
      const stats = await stat(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      return {
        content: [
          {
            type: "text",
            text: `File: ${filename}\nSize: ${sizeKB} KB\nModified: ${stats.mtime.toLocaleString()}\nType: ${stats.isDirectory() ? 'Folder' : 'File'}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting file info: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// APPLICATION CONTROL
// ============================================

server.tool(
  "launch_application",
  "Launch a macOS application by name",
  { app_name: z.string().describe("Name of the application to launch (e.g., 'Safari', 'Visual Studio Code')") },
  async ({ app_name }) => {
    try {
      await execFileAsync("open", ["-a", app_name]);
      return {
        content: [
          {
            type: "text",
            text: `Launched ${app_name}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error launching ${app_name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "quit_application",
  "Quit a running macOS application",
  { app_name: z.string().describe("Name of the application to quit") },
  async ({ app_name }) => {
    try {
      await execFileAsync("osascript", ["-e", `quit app "${escapeAppleScriptString(app_name)}"`]);
      return {
        content: [
          {
            type: "text",
            text: `Quit ${app_name}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error quitting ${app_name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "list_running_apps",
  "Get a list of currently running applications",
  {},
  async () => {
    try {
      const { stdout } = await execAsync(`osascript -e 'tell application "System Events" to get name of every application process whose visible is true'`);
      const apps = stdout.trim().split(', ');
      return {
        content: [
          {
            type: "text",
            text: `Running applications:\n${apps.join('\n')}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing applications: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// SPOTIFY CONTROL
// ============================================

server.tool(
  "spotify_play_track",
  "Play a specific track in Spotify by search query",
  { 
    query: z.string().describe("Search query for the track (e.g., 'Bohemian Rhapsody Queen')")
  },
  async ({ query }) => {
    try {
      await execFileAsync("osascript", ["-e", `tell application "Spotify" to play track "spotify:search:${escapeAppleScriptString(query)}"`]);
      return {
        content: [
          {
            type: "text",
            text: `Searching and playing: ${query}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error playing track: ${error instanceof Error ? error.message : "Unknown error"}\n\nMake sure Spotify is installed and running.`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_pause",
  "Pause Spotify playback",
  {},
  async () => {
    try {
      await execFileAsync("osascript", ["-e", "tell application \"Spotify\" to pause"]);
      return {
        content: [
          {
            type: "text",
            text: "Spotify paused",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error pausing Spotify: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_play",
  "Resume Spotify playback",
  {},
  async () => {
    try {
      await execFileAsync("osascript", ["-e", "tell application \"Spotify\" to play"]);
      return {
        content: [
          {
            type: "text",
            text: "Spotify resumed",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error resuming Spotify: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_next_track",
  "Skip to the next track in Spotify",
  {},
  async () => {
    try {
      await execFileAsync("osascript", ["-e", "tell application \"Spotify\" to next track"]);
      return {
        content: [
          {
            type: "text",
            text: "Skipped to next track",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error skipping track: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_previous_track",
  "Go back to the previous track in Spotify",
  {},
  async () => {
    try {
      await execFileAsync("osascript", ["-e", "tell application \"Spotify\" to previous track"]);
      return {
        content: [
          {
            type: "text",
            text: "Went to previous track",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error going to previous track: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_get_current_track",
  "Get information about the currently playing track",
  {},
  async () => {
    try {
      const { stdout } = await execAsync(`osascript -e 'tell application "Spotify"
        set trackName to name of current track
        set artistName to artist of current track
        set albumName to album of current track
        return trackName & " by " & artistName & " from " & albumName
      end tell'`);
      return {
        content: [
          {
            type: "text",
            text: `Now playing: ${stdout.trim()}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting current track: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "spotify_set_volume",
  "Set Spotify volume (0-100)",
  { volume: z.number().min(0).max(100).describe("Volume level (0-100)") },
  async ({ volume }) => {
    try {
      await execFileAsync("osascript", ["-e", `tell application "Spotify" to set sound volume to ${volume}`]);
      return {
        content: [
          {
            type: "text",
            text: `Spotify volume set to ${volume}%`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error setting volume: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// WINDOW MANAGEMENT
// ============================================

server.tool(
  "list_windows",
  "List all open windows with their applications",
  {},
  async () => {
    try {
      const { stdout } = await execAsync(`osascript -e 'tell application "System Events"
        set windowList to {}
        repeat with theProcess in (every process whose visible is true)
          set processName to name of theProcess
          repeat with theWindow in (windows of theProcess)
            set end of windowList to processName & ": " & name of theWindow
          end repeat
        end repeat
        return windowList
      end tell'`);
      const windows = stdout.trim().split(', ');
      return {
        content: [
          {
            type: "text",
            text: `Open windows:\n${windows.join('\n')}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing windows: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "focus_window",
  "Bring a specific application window to front",
  { app_name: z.string().describe("Name of the application to focus") },
  async ({ app_name }) => {
    try {
      await execFileAsync("osascript", ["-e", `tell application "${escapeAppleScriptString(app_name)}" to activate`]);
      return {
        content: [
          {
            type: "text",
            text: `Focused ${app_name}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error focusing window: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "minimize_window",
  "Minimize the frontmost window of an application",
  { app_name: z.string().describe("Name of the application") },
  async ({ app_name }) => {
    try {
      await execFileAsync("osascript", ["-e", `tell application "System Events" to tell process "${escapeAppleScriptString(app_name)}" to set miniaturized of window 1 to true`]);
      return {
        content: [
          {
            type: "text",
            text: `Minimized ${app_name} window`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error minimizing window: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_active_window",
  "Get the name of the currently focused application and window",
  {},
  async () => {
    try {
      const { stdout } = await execAsync(`osascript -e 'tell application "System Events"
        set frontApp to name of first application process whose frontmost is true
        set frontWindow to name of front window of process frontApp
        return frontApp & ": " & frontWindow
      end tell'`);
      return {
        content: [
          {
            type: "text",
            text: `Active window: ${stdout.trim()}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting active window: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// SYSTEM CONTROL
// ============================================

server.tool(
  "set_brightness",
  "Set display brightness (0.0 to 1.0)",
  { level: z.number().min(0).max(1).describe("Brightness level (0.0 = darkest, 1.0 = brightest)") },
  async ({ level }) => {
    try {
      await execFileAsync("osascript", ["-e", 'tell application "System Events" to tell appearance preferences to set dark mode to false']);
      await execFileAsync("brightness", [String(level)]);
      return {
        content: [
          {
            type: "text",
            text: `Brightness set to ${(level * 100).toFixed(0)}%`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error setting brightness: ${error instanceof Error ? error.message : "Unknown error"}\n\nNote: This may require the 'brightness' command line tool to be installed.`,
          },
        ],
      };
    }
  }
);

server.tool(
  "set_system_volume",
  "Set system volume (0-100)",
  { volume: z.number().min(0).max(100).describe("Volume level (0-100)") },
  async ({ volume }) => {
    try {
      await execFileAsync("osascript", ["-e", `set volume output volume ${volume}`]);
      return {
        content: [
          {
            type: "text",
            text: `System volume set to ${volume}%`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error setting volume: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "toggle_dark_mode",
  "Toggle macOS dark mode on or off",
  { enable: z.boolean().describe("True to enable dark mode, false to disable") },
  async ({ enable }) => {
    try {
      await execFileAsync("osascript", ["-e", `tell application "System Events" to tell appearance preferences to set dark mode to ${enable}`]);
      return {
        content: [
          {
            type: "text",
            text: `Dark mode ${enable ? 'enabled' : 'disabled'}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error toggling dark mode: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ============================================
// BROWSER & NETWORK
// ============================================

server.tool(
  "open_url",
  "Open a URL in the default browser",
  { url: z.string().describe("The URL to open") },
  async ({ url }) => {
    try {
      await execFileAsync("open", [url]);
      return {
        content: [
          {
            type: "text",
            text: `Opened ${url}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error opening URL: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "check_internet",
  "Check if internet connection is available",
  {},
  async () => {
    try {
      await execAsync(`ping -c 1 8.8.8.8`);
      return {
        content: [
          {
            type: "text",
            text: "Internet connection: ✅ Connected",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Internet connection: ❌ Not connected",
          },
        ],
      };
    }
  }
);

// ============================================
// NOTIFICATIONS
// ============================================

server.tool(
  "send_notification",
  "Display a macOS system notification",
  {
    title: z.string().describe("Notification title"),
    message: z.string().describe("Notification message"),
  },
  async ({ title, message }) => {
    try {
      await execFileAsync("osascript", ["-e", `display notification "${escapeAppleScriptString(message)}" with title "${escapeAppleScriptString(title)}"`]);
      return {
        content: [
          {
            type: "text",
            text: "Notification sent",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error sending notification: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "show_alert",
  "Show an alert dialog with a message",
  {
    title: z.string().describe("Alert title"),
    message: z.string().describe("Alert message"),
  },
  async ({ title, message }) => {
    try {
      await execFileAsync("osascript", ["-e", `display alert "${escapeAppleScriptString(title)}" message "${escapeAppleScriptString(message)}"`]);
      return {
        content: [
          {
            type: "text",
            text: "Alert displayed",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error showing alert: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// Start Server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("🛡️ Heimdall MCP Server v0.2.0 is now watching over your system...");