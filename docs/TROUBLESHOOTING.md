# 🐛 Troubleshooting Guide

Common issues and their solutions when using Heimdall MCP Server.

---

## Connection Issues

### ❌ "Server disconnected" Error

**Symptom:** Red error banner in Claude saying "MCP heimdall-mcp: Server disconnected"

**Common Causes:**

#### 1. Bun Not Found
Claude can't locate the Bun executable.

**Solution:**
```bash
# Find Bun's location
which bun

# Update claude_desktop_config.json with FULL path
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Change from:
```json
"command": "bun"
```

To (using your actual path):
```json
"command": "/Users/yourusername/.bun/bin/bun"
```

#### 2. Incorrect Path to index.ts

**Solution:**
```bash
# Go to heimdall-mcp folder
cd /path/to/heimdall-mcp

# Get absolute path
pwd
```

Update config with exact path including `/index.ts` at the end.

#### 3. Configuration Syntax Error

**Solution:**
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Common mistakes:
  - Missing commas
  - Missing quotes around strings
  - Trailing commas (not allowed in JSON)

**Correct format:**
```json
{
  "mcpServers": {
    "heimdall-mcp": {
      "command": "/full/path/to/bun",
      "args": ["run", "/full/path/to/heimdall-mcp/index.ts"]
    }
  }
}
```

#### 4. Claude Not Fully Restarted

**Solution:**
- Don't just close the window!
- Press `Cmd + Q` to fully quit
- Wait 3-5 seconds
- Reopen Claude Desktop

---

## Screenshot Issues

### ❌ "Could not create image from display"

**Symptom:** Screenshot command fails with permission error

**Solution:**

1. Grant Screen Recording permission:
   - Open **System Settings**
   - Go to **Privacy & Security** → **Screen Recording**
   - Enable **Claude** (toggle it on)

2. If Claude isn't in the list:
   - Click the **+** button
   - Navigate to **Applications**
   - Select **Claude**
   - Toggle it on

3. **Restart Claude Desktop** completely (`Cmd + Q`)

4. Test again:
   ```
   "Take a screenshot"
   ```

---

## Tool Not Found Errors

### ❌ "Tool 'heimdall-mcp:get_battery' not found"

**Symptom:** Specific tools aren't available

**Possible Causes:**

#### 1. Server Not Connected
Check for the 🔌 plug icon in Claude. If it's not there or shows disconnected, see "Connection Issues" above.

#### 2. Old Cache
**Solution:**
```bash
# Clear Claude's cache
rm -rf ~/Library/Caches/Claude

# Restart Claude
```

#### 3. Wrong Server Name in Config
**Solution:**
Ensure your config uses `"heimdall-mcp"` exactly:
```json
{
  "mcpServers": {
    "heimdall-mcp": {  // ← Must be exactly this
      ...
    }
  }
}
```

---

## Application Control Issues

### ❌ "Error launching [app]" or "Application not found"

**Symptom:** Can't launch or quit applications

**Solutions:**

#### 1. Check Application Name
Use the exact name as it appears in Applications folder:
- ✅ "Visual Studio Code"
- ❌ "vscode" or "VS Code"

#### 2. Common App Names
```
"Safari"
"Google Chrome"
"Spotify"
"Visual Studio Code"
"Discord"
"Slack"
```

#### 3. For Apps in Non-Standard Locations
Some apps may not be in `/Applications`. Try the full path:
```
"Launch /Applications/Utilities/Terminal.app"
```

---

## Performance Issues

### ⚠️ Slow Response Times

**Symptom:** Commands take a long time to execute

**Solutions:**

#### 1. Check System Resources
```
"What's my CPU usage?"
"Check my RAM usage"
```

If CPU > 80% or RAM > 90%, close unnecessary apps.

#### 2. Restart Heimdall
```bash
# In Claude, the server auto-restarts
# Just fully quit and reopen Claude (Cmd + Q)
```

---

## Debugging

### View Real-Time Logs

To see what's happening behind the scenes:

```bash
# Open logs in real-time
tail -f ~/Library/Logs/Claude/mcp*.log
```

Keep this running while you test commands in Claude. Look for error messages.

### Check Server Status

1. Try running the server manually:
```bash
cd /path/to/heimdall-mcp
bun run index.ts
```

2. You should see:
```
🛡️ Heimdall MCP Server is now watching over your system...
```

3. If you see errors here, they'll tell you what's wrong:
   - Missing dependencies → Run `bun install`
   - Syntax errors → Check your code
   - Permission errors → Check file permissions

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Module not found" | Can't find index.ts | Check path in config |
| "ENOENT" | File doesn't exist | Verify paths are correct |
| "Permission denied" | Missing permissions | Check file/folder permissions |
| "Failed to spawn" | Can't run Bun | Use full path to Bun |

---

## Still Having Issues?

### 1. Check Installation

Verify everything is installed correctly:
```bash
# Check Bun
bun --version

# Check dependencies
cd /path/to/heimdall-mcp
bun install

# Test server manually
bun run index.ts
```

### 2. Start Fresh

If nothing works, try a clean reinstall:

```bash
# 1. Backup your config
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json ~/Desktop/

# 2. Remove Heimdall
cd /path/to/heimdall-mcp/..
rm -rf heimdall-mcp

# 3. Clone fresh
git clone https://github.com/sarva-20/heimdall-mcp.git
cd heimdall-mcp
bun install

# 4. Reconfigure (see Installation Guide)
```

### 3. Get Help

If you're still stuck:

1. Check existing [GitHub Issues](https://github.com/sarva-20/heimdall-mcp/issues)
2. Open a new issue with:
   - Your macOS version
   - Bun version (`bun --version`)
   - Error messages from logs
   - What you've already tried

---

## Useful Commands

```bash
# View logs
tail -f ~/Library/Logs/Claude/mcp*.log

# Find Bun
which bun

# Find Heimdall path
cd /path/to/heimdall-mcp && pwd

# Test server
bun run index.ts

# Reinstall dependencies
rm -rf node_modules && bun install

# Check config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

---

[← Back to README](../README.md) • [Installation Guide](INSTALLATION.md) • [Usage Guide](USAGE.md)