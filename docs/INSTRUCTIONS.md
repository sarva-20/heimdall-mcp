# 📦 Installation Guide

Complete guide to installing and configuring Heimdall MCP Server.

---

## Prerequisites

### 1. Install Bun Runtime

Check if Bun is already installed:
```bash
bun --version
```

If not installed, run:
```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal or run:
```bash
source ~/.bashrc  # or ~/.zshrc
```

### 2. Download Claude Desktop

Download from [claude.ai/download](https://claude.ai/download) and install the application.

---

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/sarva-20/heimdall-mcp.git
cd heimdall-mcp
```

### Step 2: Install Dependencies

```bash
bun install
```

This will install all required packages:
- `@modelcontextprotocol/sdk` - MCP protocol
- `systeminformation` - System metrics
- `zod` - Schema validation

### Step 3: Find Required Paths

You need two absolute paths for configuration:

**Get Bun path:**
```bash
which bun
```
Example output: `/Users/yourusername/.bun/bin/bun`

**Get Heimdall path:**
```bash
pwd
```
Example output: `/Users/yourusername/Documents/heimdall-mcp`

⚠️ **Important:** Copy these exact paths - you'll need them in the next step!

### Step 4: Configure Claude Desktop

Open Claude's configuration file:
```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add Heimdall configuration (replace with YOUR paths):

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

**Configuration Notes:**
- Use FULL absolute paths (not `~` or relative paths)
- Use the exact path from `which bun` (not just "bun")
- Ensure path to `index.ts` is complete
- Double-check for typos - they're the #1 cause of connection issues

**Example of correct configuration:**
```json
{
  "mcpServers": {
    "heimdall-mcp": {
      "command": "/Users/sarva/.bun/bin/bun",
      "args": ["run", "/Users/sarva/Documents/heimdall-mcp/index.ts"]
    }
  }
}
```

### Step 5: Grant System Permissions

Heimdall needs certain macOS permissions to function fully.

#### Screen Recording Permission (for screenshots)

1. Open **System Settings**
2. Go to **Privacy & Security**
3. Click **Screen Recording** in the sidebar
4. Find and enable **Claude** in the list
5. Restart Claude Desktop

If Claude isn't in the list, you may need to manually add it by clicking the "+" button.

### Step 6: Restart Claude Desktop

Completely quit and restart Claude:
1. Click Claude in the menu bar
2. Select "Quit Claude" (or press `Cmd + Q`)
3. Wait 3 seconds
4. Reopen Claude Desktop

### Step 7: Verify Connection

1. Look for the 🔌 **plug icon** in Claude's interface (usually bottom-left)
2. Click the icon
3. You should see "heimdall-mcp" listed as **Connected**
4. If you see a green indicator, you're good to go!

---

## Testing Your Installation

Try these commands in Claude to verify everything works:

```
"Check my battery"
"What's my CPU usage?"
"Get system information"
```

If these work, congratulations! 🎉 Heimdall is properly installed.

If you encounter issues, see the [Troubleshooting Guide](TROUBLESHOOTING.md).

---

## Updating Heimdall

To update to the latest version:

```bash
cd heimdall-mcp
git pull origin main
bun install
```

Then restart Claude Desktop.

---

## Uninstalling

To remove Heimdall:

1. Remove from Claude config:
```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
Delete the `"heimdall-mcp"` section.

2. Delete the repository:
```bash
rm -rf /path/to/heimdall-mcp
```

3. Restart Claude Desktop

---

## Next Steps

- Read the [Usage Guide](USAGE.md) to learn all commands
- Check out [Troubleshooting](TROUBLESHOOTING.md) if you have issues
- Learn how to [Contribute](CONTRIBUTING.md)

---

[← Back to README](../README.md)