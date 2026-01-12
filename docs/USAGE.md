# 📖 Usage Guide

Complete guide to using Heimdall MCP Server with Claude.

---

## Getting Started

Once Heimdall is installed and connected, you can interact with it through natural language in Claude Desktop. No special syntax required - just talk to Claude normally!

---

## System Monitoring

### Battery Status

Check your battery level, charging status, and time remaining.

**Examples:**
```
"What's my battery percentage?"
"Check my battery"
"How much battery do I have left?"
"Is my laptop charging?"
```

**Returns:**
```
Battery: 75%, Charging, Remaining: 120 mins
```

---

### CPU Usage

Monitor your processor load in real-time.

**Examples:**
```
"What's my CPU usage?"
"Check CPU load"
"How much processing power am I using?"
"Is my CPU under heavy load?"
```

**Returns:**
```
CPU Load: 23.45%
```

---

### Memory (RAM) Usage

Check how much RAM you're currently using.

**Examples:**
```
"How much RAM am I using?"
"Check memory usage"
"What's my memory consumption?"
"Do I have enough RAM available?"
```

**Returns:**
```
RAM: 8.23GB / 16.00GB (51.4% used)
```

---

### System Information

Get comprehensive details about your Mac.

**Examples:**
```
"What are my system specs?"
"Show me my computer information"
"What Mac do I have?"
"Get system info"
```

**Returns:**
```
System: macOS 14.2
Hostname: Sarvatarshans-MacBook-Air
CPU: Apple M1 (8 cores)
```

---

## System Actions

### Text-to-Speech

Make your Mac speak any message out loud.

**Examples:**
```
"Say 'Hello World' out loud"
"Speak the message 'Meeting in 5 minutes'"
"Announce 'Coffee is ready'"
"Tell me 'Time to take a break' using voice"
```

**Use Cases:**
- Reminders and alerts
- Accessibility
- Notification announcements
- Fun interactions

---

### Screenshots

Capture your current screen (requires Screen Recording permission).

**Examples:**
```
"Take a screenshot"
"Capture my screen"
"Screenshot this"
"Show me what's on my screen"
```

**Advanced Usage:**
```
"Take a screenshot and tell me what code I'm looking at"
"Capture my screen and analyze the error message"
"Screenshot this and explain what's happening"
```

**Note:** First time will prompt for Screen Recording permission. See [Installation Guide](INSTALLATION.md) for setup.

---

## Clipboard Operations

### Read Clipboard

Access whatever you've recently copied.

**Examples:**
```
"What's in my clipboard?"
"Read my clipboard"
"What did I just copy?"
"Show me clipboard content"
```

**Advanced Usage:**
```
"Read my clipboard and explain the error"
"What's in my clipboard? Translate it to Spanish"
"Read clipboard and format it as JSON"
```

---

### Write to Clipboard

Copy text directly to your clipboard.

**Examples:**
```
"Copy 'Hello World' to clipboard"
"Put this code in my clipboard: console.log('test')"
"Copy my email address to clipboard"
```

**Advanced Usage:**
```
"Generate a random password and copy it to clipboard"
"Create a SQL query for users table and copy it"
"Write a professional email template and copy it"
```

---

## File Operations

### Save to Desktop

Create files directly on your Desktop.

**Examples:**
```
"Save this code to desktop as script.py"
"Create a file called notes.txt with [content]"
"Write this to desktop/todo.md"
```

**Advanced Usage:**
```
"Create a Python script that reads CSV files and save it as csv_reader.py"
"Generate a bash script for backups and save it as backup.sh"
"Write a markdown document about this topic and save as guide.md"
```

**Supported Formats:**
- `.txt` - Plain text
- `.md` - Markdown
- `.py` - Python scripts
- `.js` - JavaScript
- `.json` - JSON data
- `.sh` - Shell scripts
- `.html` - HTML files
- Any text-based format

---

## Application Control

### Launch Applications

Open any Mac application by name.

**Examples:**
```
"Launch Spotify"
"Open Safari"
"Start Visual Studio Code"
"Launch Terminal"
```

**Common Applications:**
- Safari
- Google Chrome
- Firefox
- Spotify
- Discord
- Slack
- Visual Studio Code
- Terminal
- Mail
- Calendar
- Notes

**Conditional Launch:**
```
"If my battery is above 50%, launch Spotify"
"Check CPU usage, and if it's below 50%, open Chrome"
```

---

### Quit Applications

Close running applications.

**Examples:**
```
"Quit Safari"
"Close Spotify"
"Stop Chrome"
"Exit Discord"
```

**Bulk Operations:**
```
"Quit Safari, Chrome, and Spotify"
"Close all browsers"
```

---

### List Running Apps

See what applications are currently open.

**Examples:**
```
"What apps are running?"
"Show me open applications"
"List all running apps"
"What do I have open?"
```

**Advanced Usage:**
```
"What apps are running? Close any I'm not using"
"Show running apps and their memory usage"
"List my apps and organize them by category"
```

---

## Advanced Workflows

### Chained Commands

Combine multiple actions in one request:

```
"Check my battery. If it's below 20%, say 'Low battery' out loud"

"Read my clipboard, analyze the error, and save the solution to desktop as fix.md"

"Take a screenshot, analyze what's on screen, and summarize it"

"Launch Spotify, then say 'Music started' out loud"

"Check CPU and RAM usage, and if both are high, list running apps"
```

---

### Troubleshooting Workflows

```
"Read the error from my clipboard, explain it, and save the solution to desktop"

"Take a screenshot of this error and tell me how to fix it"

"Check system resources and tell me if I should close any apps"

"Monitor my battery and warn me if it drops below 20%"
```

---

### Development Workflows

```
"Create a Python script that does [task] and save it to desktop"

"Read this code from clipboard, review it, and save an improved version"

"Generate a bash script for [task] and save as script.sh"

"Create a README template and save it to desktop"
```

---

### Productivity Workflows

```
"Every hour, say 'Take a break' out loud"

"Check my battery every 30 minutes and alert me if low"

"Save my daily journal entry to desktop as journal-[date].md"

"Create a meeting notes template and save it"
```

---

## Tips & Best Practices

### 1. Be Natural
You don't need special commands - just ask naturally:
- ✅ "What's my battery at?"
- ✅ "Check the battery for me"
- ✅ "Battery percentage please"

### 2. Combine Actions
Heimdall works great with multiple steps:
```
"Check my system resources, and if everything looks good, launch my development apps"
```

### 3. Use Context
Claude remembers your conversation:
```
You: "What's my battery?"
Claude: "75%, charging"
You: "Great! Launch Spotify then"
```

### 4. Be Specific with Apps
Use exact names as they appear in Applications:
- ✅ "Visual Studio Code"
- ❌ "VS Code" or "vscode"

### 5. Leverage File Saving
Instead of copying code, save it directly:
```
"Create a Python script that [does X] and save it as script.py"
```

---

## Safety Notes

- **File Operations:** Files are saved to Desktop by default - check before running important operations
- **App Control:** Heimdall can quit apps without warning - double-check before closing important work
- **Screenshots:** Requires Screen Recording permission - Claude can see what you see
- **Clipboard:** Heimdall can read sensitive data in your clipboard - be mindful of what you copy

---

## Next Steps

- See [Troubleshooting](TROUBLESHOOTING.md) for common issues
- Check out [Contributing](CONTRIBUTING.md) to add new features
- Report bugs on [GitHub Issues](https://github.com/sarva-20/heimdall-mcp/issues)

---

[← Back to README](../README.md) • [Installation Guide](INSTALLATION.md) • [Troubleshooting](TROUBLESHOOTING.md)