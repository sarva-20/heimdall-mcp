# Changelog

All notable changes to Heimdall MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-01-19

### 🎉 Initial Release

**Heimdall MCP Server is now live on [mcpservers.org](https://mcpservers.org)!**

### Added

#### System Monitoring
- `get_battery` - Battery status with percentage, charging state, and time remaining
- `get_cpu_load` - Real-time CPU load percentage
- `get_memory_usage` - RAM usage in GB with percentage
- `get_system_info` - Comprehensive system information (OS, CPU, hostname)

#### System Actions
- `speak_message` - Text-to-speech using macOS native voice
- `take_screenshot` - Capture screen (requires Screen Recording permission)

#### Clipboard Operations
- `read_clipboard` - Read current clipboard text content
- `write_to_clipboard` - Copy text to clipboard

#### File Operations
- `save_to_desktop` - Save text content directly to Desktop

#### Application Control
- `launch_application` - Launch any macOS application by name
- `quit_application` - Quit running applications
- `list_running_apps` - List all currently running applications

### Documentation
- Comprehensive README with quick start guide
- Detailed installation guide (docs/INSTALLATION.md)
- Complete usage guide with examples (docs/USAGE.md)
- Troubleshooting guide (docs/TROUBLESHOOTING.md)
- Contributing guidelines (docs/CONTRIBUTING.md)
- MIT License

### Technical
- Built with Model Context Protocol (MCP)
- TypeScript implementation
- Bun runtime support
- Comprehensive error handling for all tools
- Zod schema validation

---

## [Unreleased]

### Planned for v0.2 (Media & Productivity)
- Spotify advanced controls (play track/playlist, pause, skip, volume)
- Window management (focus, minimize, list windows)
- Get currently playing track information

### Planned for v0.3 (Smart Notifications)
- System notifications
- Scheduled reminders
- Read files from Desktop
- File search functionality

### Planned for v0.4 (System Control)
- Brightness control
- Volume control
- Dark mode toggle
- Browser URL opening
- Lock screen/Sleep commands

### Planned for v0.5 (Advanced Features)
- Network information (IP address, WiFi)
- Process monitoring
- Internet connectivity check

---

## Version History

- **v1.0.0** - Initial public release (2026-01-19)
  - Core system monitoring
  - Application control
  - File and clipboard operations
  - Approved on mcpservers.org

---

## Links

- [GitHub Repository](https://github.com/sarva-20/heimdall-mcp)
- [MCP Servers Directory](https://mcpservers.org)
- [Report Issues](https://github.com/sarva-20/heimdall-mcp/issues)