# 🛡️ Heimdall MCP Server ⚔️

## 🌐 **[Visit Official Website](https://heimdall-mcp-v02.vercel.app)** | [Documentation](docs/) | [GitHub](https://github.com/sarva-20/heimdall-mcp)

---
<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/sarva-20/heimdall-mcp/releases)
[![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue)](https://modelcontextprotocol.io)
[![mcpservers.org](https://img.shields.io/badge/listed-mcpservers.org-green)](https://mcpservers.org)
[![macOS](https://img.shields.io/badge/platform-macOS-lightgrey)](https://www.apple.com/macos/)
[![Bun](https://img.shields.io/badge/runtime-bun-ff69b4)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Security](https://img.shields.io/badge/security-policy-red)](SECURITY.md)

**"The all-seeing guardian of the Bifröst."**

Heimdall bridges Claude Desktop and your macOS system, giving AI the power to monitor hardware, control applications, and interact with your workflow.

**[📦 Latest Release](https://github.com/sarva-20/heimdall-mcp/releases) • [📖 Documentation](docs/INSTALLATION.md) • [🐛 Report Bug](https://github.com/sarva-20/heimdall-mcp/issues)**

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 👁️ **Vision** | Take screenshots and see your screen |
| 👂 **Voice** | Text-to-speech for audio feedback |
| 🔋 **Monitoring** | Battery, CPU, and RAM metrics |
| 💻 **System Info** | OS details, CPU specs, hostname |
| 📋 **Clipboard** | Read and write clipboard content |
| 📂 **Files** | Save files directly to Desktop |
| 🚀 **App Control** | Launch, quit, and list applications |

---

---

## 📁 Repository Structure

This monorepo contains:

- **`/src`** - Heimdall MCP Server (TypeScript)
- **`/website`** - Official React landing page
- **`/docs`** - Complete documentation

### 🌐 Website

Our landing page is built with React + Vite + Tailwind and deployed on Vercel.

**Live at:** [heimdall-mcp-v02.vercel.app](https://heimdall-mcp-v02.vercel.app)

To run locally:
```bash
cd website
npm install
npm run dev
```

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/sarva-20/heimdall-mcp.git
cd heimdall-mcp
bun install

# Configure (see Installation Guide)
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Full setup guide:** [📖 Installation](docs/INSTALLATION.md)

---

## 🎬 Demo

**🌐 [Interactive Demo on Our Website](https://heimdall-mcp-v02.vercel.app)** - Try Heimdall commands in your browser!

See live examples, explore features, and test the interactive playground.
### Example Commands

```
"Check my battery levels"
"Launch Spotify"
"What apps are running?"
"Read my clipboard and explain the error"
"Save this code to my desktop as script.py"
```

---

## 📚 Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Complete setup instructions
- **[Usage Guide](docs/USAGE.md)** - Examples and commands
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and fixes
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history

---

## 🛠️ Available Tools

### System Monitoring
- `get_battery` - Battery status with time remaining
- `get_cpu_load` - Current CPU usage
- `get_memory_usage` - RAM usage with percentage
- `get_system_info` - OS, CPU, and hostname

### System Actions
- `speak_message` - Text-to-speech output
- `take_screenshot` - Capture screen (requires permission)

### Clipboard & Files
- `read_clipboard` - Read clipboard content
- `write_to_clipboard` - Copy text to clipboard
- `save_to_desktop` - Save files to Desktop

### Application Control
- `launch_application` - Open macOS apps
- `quit_application` - Close running apps
- `list_running_apps` - List all running apps

---

## 🧰 Requirements

- **macOS** (Apple Silicon or Intel)
- **Bun** runtime ([Install](https://bun.sh))
- **Claude Desktop** ([Download](https://claude.ai/download))

---

## 🗓️ Roadmap

### v0.2 - Media & Productivity ✅ **Released**
- 🎵 Spotify advanced controls (play, pause, skip, playlists)
- 🪟 Window management (focus, minimize, list)
- 🎵 Get currently playing track
- 🎨 System control (volume, brightness, dark mode)

### v0.3 - Smart Notifications
- 🔔 System notifications and scheduled reminders
- 📁 Enhanced file operations (read, search)

### v0.4 - System Control
- 🎨 Brightness and volume control
- 🌐 Browser integration
- 🔐 Lock screen and sleep commands

[View Full Roadmap](CHANGELOG.md#unreleased)

---

## 📦 Installation

### Quick Install

```bash
git clone https://github.com/sarva-20/heimdall-mcp.git
cd heimdall-mcp
bun install
```

### Configure Claude Desktop

Find your paths:
```bash
which bun  # Get Bun path
pwd        # Get Heimdall path
```

Edit config:
```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add:
```json
{
  "mcpServers": {
    "heimdall-mcp": {
      "command": "/path/to/bun",
      "args": ["run", "/path/to/heimdall-mcp/index.ts"]
    }
  }
}
```

Restart Claude Desktop (`Cmd + Q`).

**Detailed instructions:** [Installation Guide](docs/INSTALLATION.md)

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments
-
- ## 🔒 Security
-
- See [SECURITY.md](SECURITY.md) for our security policy and vulnerability reporting process.
-
- Special thanks to:
- - **Ryan Vonbrubeck** ([@dodge1218](https://github.com/dodge1218)) for responsible disclosure of command injection vulnerability
-
-Listed on [mcpservers.org](https://mcpservers.org)
- Built with the [Model Context Protocol](https://modelcontextprotocol.io) by Anthropic
- Inspired by Norse mythology and Heimdall, the all-seeing guardian

---

## 📬 Contact & Support

**Sarvatarshan Sankar**
- GitHub: [@sarva-20](https://github.com/sarva-20)
- Repository: [heimdall-mcp](https://github.com/sarva-20/heimdall-mcp)

---
<div align="center">

**🛡️ Heimdall is now watching over your system. ⚔️**

Made with ❤️ by [Sarvatarshan Sankar](https://github.com/sarva-20)

**[🌐 Visit Website](https://heimdall-mcp-v02.vercel.app)** • [⭐ Star on GitHub](https://github.com/sarva-20/heimdall-mcp) • [Report Bug](https://github.com/sarva-20/heimdall-mcp/issues) • [Request Feature](https://github.com/sarva-20/heimdall-mcp/issues)

</div>
