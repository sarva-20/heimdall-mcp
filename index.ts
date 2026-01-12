import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import si from "systeminformation";
import { z } from "zod";
import { exec } from "child_process";
import util from "util";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

const execAsync = util.promisify(exec);

// Initialize the Server
const server = new McpServer({
  name: "heimdall-mcp",
  version: "1.0.0",
});

// --- SYSTEM SENSORS ---

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

// --- SYSTEM ACTIONS ---

server.tool(
  "speak_message",
  "Speak a message out loud using macOS text-to-speech",
  { message: z.string().describe("The message to speak aloud") },
  async ({ message }) => {
    try {
      await execAsync(`say "${message.replace(/"/g, '\\"')}"`);
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
      await execAsync(`screencapture -x ${screenshotPath}`);
      
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

// --- CLIPBOARD & FILES ---

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

// --- APPLICATION CONTROL ---

server.tool(
  "launch_application",
  "Launch a macOS application by name",
  { app_name: z.string().describe("Name of the application to launch (e.g., 'Safari', 'Visual Studio Code')") },
  async ({ app_name }) => {
    try {
      await execAsync(`open -a "${app_name.replace(/"/g, '\\"')}"`);
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
      await execAsync(`osascript -e 'quit app "${app_name.replace(/"/g, '\\"')}"'`);
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

// Start Server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("🛡️ Heimdall MCP Server is now watching over your system...");