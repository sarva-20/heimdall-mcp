# 🛡️ Heimdall – MCP Server ⚔️

> *“The all-seeing guardian of the Bifröst.”*

**Heimdall** is a **Model Context Protocol (MCP) server** that acts as the bridge between **Claude Desktop** and your local **macOS** system. It gives the AI *eyes* and *hands* to monitor your hardware and interact with your workflow.

---

## ✨ Features

- 👁️ **All-Seeing Vision** – Take screenshots (with permission) so Claude can see your screen  
- 👂 **The Horn of Gjallar** – Make your Mac speak using native Text-to-Speech  
- 🔋 **Vitality Monitor** – Real-time battery, CPU, and RAM usage  
- 📋 **Rune Carving (Clipboard)** – Read and write from the universal clipboard  
- 📂 **Archives** – Write files directly to your Desktop (code, notes, logs)

---

## 🧰 Prerequisites

- macOS (Apple Silicon or Intel)  
- **Bun** installed  
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **Claude Desktop App**

---

## 🛠️ Installation

### 1️⃣ Clone the Guardian

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/heimdall-mcp.git
cd heimdall-mcp
bun install
```

---

### 2️⃣ Connect the Bridge

Tell Claude where Heimdall lives.

Get the absolute path:

```bash
pwd
# Example: /Users/thor/documents/heimdall-mcp
```

Open the Claude config file:

```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add this entry (replace `YOUR_PATH` with your actual path):

```json
{
  "mcpServers": {
    "heimdall": {
      "command": "bun",
      "args": ["run", "YOUR_PATH/index.ts"]
    }
  }
}
```

---

### 3️⃣ Awaken Heimdall

Restart Claude Desktop completely (`Cmd + Q`).  
Look for the **🔌 plug icon** to confirm Heimdall is connected.

---

## 🚀 Usage

Try commands like:

```text
"Heimdall, check my battery levels."
"Read the error from my clipboard and explain it."
"Take a screenshot and tell me what code I'm looking at."
```

---

🧙‍♂️ *Heimdall is now watching over your system.*
