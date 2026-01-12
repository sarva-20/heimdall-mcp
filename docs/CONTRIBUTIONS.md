# 🤝 Contributing to Heimdall

Thank you for your interest in contributing to Heimdall MCP Server! This guide will help you get started.

---

## 🌟 Ways to Contribute

### 1. Report Bugs
Found a bug? [Open an issue](https://github.com/sarva-20/heimdall-mcp/issues/new) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your macOS version and Bun version
- Relevant error logs

### 2. Suggest Features
Have an idea? [Open an issue](https://github.com/sarva-20/heimdall-mcp/issues/new) with:
- Clear description of the feature
- Use case and benefits
- Potential implementation approach

### 3. Improve Documentation
- Fix typos or unclear sections
- Add examples
- Translate to other languages
- Create tutorials or guides

### 4. Write Code
- Fix bugs
- Implement new features
- Optimize performance
- Add tests

---

## 🚀 Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/heimdall-mcp.git
cd heimdall-mcp
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/sarva-20/heimdall-mcp.git
```

### Setup Development Environment

```bash
# Install dependencies
bun install

# Run the server locally
bun run index.ts
```

---

## 💻 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring

### 2. Make Your Changes

Follow these guidelines:

#### Code Style
- Use TypeScript
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure

#### Error Handling
Always wrap operations in try-catch:
```typescript
server.tool(
  "your_tool",
  "Description",
  { param: z.string() },
  async ({ param }) => {
    try {
      // Your code here
      return {
        content: [{ type: "text", text: "Success message" }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);
```

#### Tool Registration
```typescript
server.tool(
  "tool_name",                    // Snake_case name
  "Clear description of what it does", // User-friendly description
  { param: z.string().describe("What this parameter does") }, // Zod schema with descriptions
  async ({ param }) => {
    // Implementation
  }
);
```

### 3. Test Your Changes

```bash
# Test the server manually
bun run index.ts

# Configure in Claude Desktop
# Test all affected functionality
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add window management tools

- Added focus_window tool
- Added minimize_window tool
- Updated documentation"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Detailed description of what and why
- Reference any related issues (#123)
- Screenshots if applicable

---

## 🎯 Feature Ideas

Looking for something to work on? Here are some ideas:

### System Control
- Window management (focus, minimize, resize)
- Display brightness control
- Volume control
- Do Not Disturb mode toggle

### File System
- Read files from Desktop
- File search functionality
- Directory listing
- File deletion (with confirmation)

### Notifications
- Create system notifications
- Schedule reminders
- Alert on specific conditions

### Network
- Check internet connectivity
- Get IP address
- Network speed test

### Process Management
- List running processes
- Monitor specific process
- Kill process by PID

### Security
- Lock screen
- Logout/Sleep/Restart commands
- Check if screen is locked

---

## 📝 Documentation Guidelines

When updating documentation:

### README.md
- Keep it concise and inviting
- Link to detailed docs
- Update feature list if needed

### Installation/Usage Guides
- Be step-by-step
- Include examples
- Add troubleshooting for common issues
- Keep commands copy-pasteable

### Code Comments
```typescript
// Good comment: explains WHY
// Using osascript because macOS has no native CLI for this

// Bad comment: explains WHAT (obvious from code)
// This gets the battery percentage
```

---

## 🔍 Code Review Process

When you submit a PR:

1. **Automated Checks** - Ensure your code runs
2. **Review** - Maintainer reviews your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, your PR will be merged!

### What Reviewers Look For
- Code quality and readability
- Proper error handling
- Documentation updates
- Testing (manual testing is OK for now)
- No breaking changes to existing functionality

---

## 🐛 Bug Fix Guidelines

When fixing bugs:

1. Reproduce the bug first
2. Write a fix
3. Test that the fix works
4. Ensure no new bugs were introduced
5. Update documentation if needed

---

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows existing style
- [ ] All tools have error handling
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Changes are tested in Claude Desktop
- [ ] No breaking changes (or clearly documented)
- [ ] Related issue is referenced (if applicable)

---

## 💬 Communication

- **Issues** - For bugs, features, and questions
- **Pull Requests** - For code contributions
- **Discussions** - For general chat and ideas

Be respectful, patient, and helpful! 😊

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make Heimdall better for everyone!

---

[← Back to README](../README.md)