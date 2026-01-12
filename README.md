# 🛡️ Heimdall MCP Server ⚔️

<div align="center">

[![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue)](https://modelcontextprotocol.io)
[![macOS](https://img.shields.io/badge/platform-macOS-lightgrey)](https://www.apple.com/macos/)
[![Bun](https://img.shields.io/badge/runtime-bun-ff69b4)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**"The all-seeing guardian of the Bifröst."**

Heimdall is a Model Context Protocol (MCP) server that bridges Claude Desktop and your macOS system, giving AI the power to monitor hardware, control applications, and interact with your workflow.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tools](#-available-tools) • [Troubleshooting](#-troubleshooting)

</div>

---

## ✨ Features

Heimdall provides Claude with comprehensive system access through these capabilities:

| Category | Features |
|----------|----------|
| 👁️ **Vision** | Take screenshots to see your screen |
| 👂 **Voice** | Speak messages using macOS Text-to-Speech |
| 🔋 **Monitoring** | Real-time battery, CPU, and RAM usage |
| 💻 **System Info** | OS details, CPU specs, and hostname |
| 📋 **Clipboard** | Read and write from universal clipboard |
| 📂 **File System** | Write files directly to Desktop |
| 🚀 **App Control** | Launch, quit, and list running applications |

---

## 🧰 Prerequisites

Before installing Heimdall, ensure you have:

### Required
- **macOS** (Apple Silicon or Intel)
- **Bun** runtime installed
- **Claude Desktop** application

### Check if Bun is installed:
```bash
bun --version
```

### Install Bun if needed:
```bash
curl -fsSL https://bun.sh/install | bash
```

### Download Claude Desktop:
Visit [claude.ai](https://claude.ai/download) to download the desktop app.

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sarva-20/heimdall-mcp.git
cd heimdall-mcp
```

### 2️⃣ Install Dependencies

```bash
bun install
```

### 3️⃣ Find Required Paths

Get your absolute paths for configuration:

```bash
# Get Bun path
which bun
# Example output: /Users/yourusername/.bun/bin/bun

# Get Heimdall path
pwd
# Example output: /Users/yourusername/Documents/heimdall-mcp
```

### 4️⃣ Configure Claude Desktop

Open Claude's configuration file:

```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add Heimdall to the configuration (replace paths with your actual paths):

```json
{
  "mcpServers": {
    "heimdall-mcp": {
      "command": "/Users/yourusername/.bun/bin/bun",
      "args": ["run", "/Users/yourusername/Documents/heimdall-mcp/index.ts"]
    }
  }
}
```

**⚠️ Important:** 
- Use the FULL path to `bun` (not just `bun`)
- Use the FULL path to `index.ts`
- Ensure there are no typos in the paths

### 5️⃣ Grant Permissions

For full functionality, Heimdall needs certain macOS permissions:

#### Screen Recording (for screenshots):
1. Open **System Settings** → **Privacy & Security** → **Screen Recording**
2. Enable **Claude** in the list
3. Restart Claude Desktop

### 6️⃣ Restart Claude Desktop

Completely quit and restart Claude:
```bash
# Press Cmd + Q to quit
# Then reopen Claude Desktop
```

### 7️⃣ Verify Connection

Look for the 🔌 **plug icon** in Claude's interface. Click it to see "heimdall-mcp" listed as connected.

---

## 🚀 Usage

Once installed, you can interact with Heimdall through natural language in Claude Desktop.

### Example Commands

```
"Heimdall, check my battery levels."
"What's my CPU usage?"
"Read the error from my clipboard and explain it."
"Take a screenshot and tell me what's on my screen."
"Launch Spotify."
"What apps are currently running?"
"Save this code snippet to my desktop as script.js"
"Get my system information."
```

### Pro Tips

- Be natural with your commands - Claude understands context
- Chain multiple actions: "Check my battery, then launch Safari if it's above 20%"
- Use Heimdall for troubleshooting: "Read my clipboard, analyze the error, and save the solution to my desktop"

---

## 🔧 Available Tools

### System Monitoring

#### `get_battery`
Get current battery status with percentage, charging state, and estimated time remaining.

**Example:**
```
"What's my battery percentage?"
```

**Returns:**
```
Battery: 75%, Charging, Remaining: 120 mins
```

---

#### `get_cpu_load`
Get current CPU load percentage.

**Example:**
```
"Check my CPU usage"
```

**Returns:**
```
CPU Load: 23.45%
```

---

#### `get_memory_usage`
Get current RAM usage in GB with percentage.

**Example:**
```
"How much RAM am I using?"
```

**Returns:**
```
RAM: 8.23GB / 16.00GB (51.4% used)
```

---

#### `get_system_info`
Get comprehensive system information including OS, CPU, and hostname.

**Example:**
```
"What are my system specs?"
```

**Returns:**
```
System: macOS 14.2
Hostname: Sarvatarshans-MacBook-Air
CPU: Apple M1 (8 cores)
```

---

### System Actions

#### `speak_message`
Speak a message out loud using macOS text-to-speech.

**Parameters:**
- `message` (string): The text to speak

**Example:**
```
"Say 'Hello World' out loud"
```

---

#### `take_screenshot`
Capture a screenshot of the current screen.

**Requirements:** Screen Recording permission must be enabled

**Example:**
```
"Take a screenshot and tell me what's on my screen"
```

---

### Clipboard Operations

#### `read_clipboard`
Read the current text content from the clipboard.

**Example:**
```
"What's in my clipboard?"
```

---

#### `write_to_clipboard`
Copy text to the clipboard.

**Parameters:**
- `text` (string): The text to copy

**Example:**
```
"Copy 'Hello World' to my clipboard"
```

---

### File Operations

#### `save_to_desktop`
Save text content to a file on the Desktop.

**Parameters:**
- `filename` (string): Name of the file to create
- `content` (string): Content to write to the file

**Example:**
```
"Save this Python code to my desktop as script.py"
```

---

### Application Control

#### `launch_application`
Launch a macOS application by name.

**Parameters:**
- `app_name` (string): Name of the application (e.g., 'Safari', 'Spotify', 'Visual Studio Code')

**Example:**
```
"Launch Spotify"
"Open Visual Studio Code"
```

---

#### `quit_application`
Quit a running macOS application.

**Parameters:**
- `app_name` (string): Name of the application to quit

**Example:**
```
"Quit Safari"
"Close Spotify"
```

---

#### `list_running_apps`
Get a list of currently running applications.

**Example:**
```
"What apps are running?"
"Show me all open applications"
```

---

## 🐛 Troubleshooting

### Issue: "Server disconnected" error

**Cause:** Claude can't find Bun or the incorrect path is configured.

**Solution:**
1. Find Bun's location: `which bun`
2. Update `claude_desktop_config.json` with the FULL path to bun
3. Restart Claude Desktop completely (`Cmd + Q`)

---

### Issue: Screenshot fails with "could not create image"

**Cause:** Screen Recording permission not granted.

**Solution:**
1. Go to **System Settings** → **Privacy & Security** → **Screen Recording**
2. Enable **Claude** in the list
3. Restart Claude Desktop

---

### Issue: Tools not appearing in Claude

**Cause:** Configuration file has errors or Claude hasn't restarted.

**Solution:**
1. Verify JSON syntax in config file (use a JSON validator)
2. Ensure paths are absolute and correct
3. Completely quit Claude (`Cmd + Q`) and reopen

---

### Issue: "Module not found" error

**Cause:** Incorrect path to `index.ts` in config.

**Solution:**
1. Navigate to heimdall-mcp folder: `cd /path/to/heimdall-mcp`
2. Get absolute path: `pwd`
3. Update config with the exact path shown
4. Make sure path ends with `/index.ts`

---

### Check Logs for Debugging

View real-time logs to diagnose issues:

```bash
tail -f ~/Library/Logs/Claude/mcp*.log
```

---

## 📖 Technical Details

### Architecture

Heimdall uses the Model Context Protocol (MCP) to communicate between Claude Desktop and your macOS system. It runs as a local server process that Claude connects to via stdio transport.

### Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `systeminformation` - System metrics and hardware info
- `zod` - Schema validation for tool parameters
- `bun` - JavaScript runtime and package manager

### Security

- All operations run locally on your machine
- No data is sent to external servers
- Permissions are controlled by macOS system preferences
- Code is open source and auditable

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- Add more system control features
- Improve error handling and logging
- Add Windows/Linux support
- Create additional tools for file management
- Enhance documentation with more examples

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by Norse mythology and Heimdall, the all-seeing guardian
- Built with the [Model Context Protocol](https://modelcontextprotocol.io)
- Powered by [Anthropic's Claude](https://claude.ai)
- Runtime provided by [Bun](https://bun.sh)

---

## 📬 Contact

**Sarvatarshan Sankar**
- GitHub: [@sarva-20](https://github.com/sarva-20)
- Repository: [heimdall-mcp](https://github.com/sarva-20/heimdall-mcp)

---

<div align="center">

**🛡️ Heimdall is now watching over your system. ⚔️**

Made with ❤️ by Sarvatarshan Sankar

</div>