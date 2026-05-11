# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Heimdall MCP, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email security concerns to: sarvatarshansankar20@gmail.com (or your preferred email)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Proof of concept (if applicable)
   - Suggested fix (if any)

I aim to respond within 24 hours and release a patch within 72 hours.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 0.2   | :x:                |

## Security Updates

### v0.2.1 (2026-02-22)
**Critical Security Patch**
- Fixed command injection vulnerability in 15+ tools
- Replaced shell execution with argv-based execution
- Eliminated shell interpretation of user input
- **Severity:** Critical (CVSS 9.8)
- **Credit:** Ryan Vonbrubeck (@dodge1218)

**Affected Tools:**
- speak_message
- launch_application
- quit_application
- open_url
- All Spotify control tools
- Window management tools
- Notification tools

**Fix:** All user-controlled input now passed via `execFile` argument arrays instead of shell string interpolation.

## Security Acknowledgments

We are grateful to these security researchers for responsible disclosure:

- **Ryan Vonbrubeck** ([@dodge1218](https://github.com/dodge1218)) - Command injection vulnerability (2026-02-22)

## Security Best Practices

When using Heimdall MCP:
- Keep the software updated
- Run with minimum required permissions
- Review the code before installation
- Use in trusted environments only
- Report any suspicious behavior

## Contact

For security concerns: sarvatarshansankar20@gmail.com (replace with your actual email)
For general issues: [GitHub Issues](https://github.com/sarva-20/heimdall-mcp/issues)
