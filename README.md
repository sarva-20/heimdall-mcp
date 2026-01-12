# 🛡️ Heimdall MCP Server ⚔️

<div align="center">

[![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue)](https://modelcontextprotocol.io)
[![macOS](https://img.shields.io/badge/platform-macOS-lightgrey)](https://www.apple.com/macos/)
[![Bun](https://img.shields.io/badge/runtime-bun-ff69b4)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**"The all-seeing guardian of the Bifröst."**

Heimdall bridges Claude Desktop and your macOS system, giving AI the power to monitor hardware, control applications, and interact with your workflow.

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

## 📚 Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Complete setup instructions
- **[Usage Guide](docs/USAGE.md)** - Examples and commands
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and fixes
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute

---

## 🎯 Example Usage

```
"Check my battery levels"
"Launch Spotify"
"What apps are running?"
"Read my clipboard and explain the error"
"Save this code to my desktop as script.py"
```

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

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with the [Model Context Protocol](https://modelcontextprotocol.io) by Anthropic.

---

<div align="center">

**🛡️ Heimdall is now watching over your system. ⚔️**

Made with ❤️ by [Sarvatarshan Sankar](https://github.com/sarva-20)

[Report Bug](https://github.com/sarva-20/heimdall-mcp/issues) • [Request Feature](https://github.com/sarva-20/heimdall-mcp/issues)

</div>