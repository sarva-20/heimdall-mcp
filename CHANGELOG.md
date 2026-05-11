# Changelog

All notable changes to this project will be documented in this file.

## [0.2.1] - 2026-02-22

### 🔒 Security

**CRITICAL SECURITY PATCH**

- **Fixed command injection vulnerability** in 15+ tools that used shell execution with user input
- Replaced `execAsync` with `execFileAsync` to eliminate shell interpretation
- User-controlled input now passed as argument arrays, preventing `$(command)` substitution attacks
- All tools audited for similar vulnerabilities

**Affected Tools:**
- System Actions: `speak_message`
- Application Control: `launch_application`, `quit_application`
- Spotify Control: `spotify_play_track`, `spotify_pause`, `spotify_play`, `spotify_next_track`, `spotify_previous_track`, `spotify_set_volume`
- Window Management: `focus_window`, `minimize_window`
- System Control: `toggle_dark_mode`
- Browser & Network: `open_url`
- Notifications: `send_notification`, `show_alert`

**Credit:** Ryan Vonbrubeck ([@dodge1218](https://github.com/dodge1218)) for responsible disclosure

**Severity:** Critical (CVSS 9.8)  
**CVE:** Pending assignment

### Changed
- Migrated from shell-based execution to argv-based execution for all user-input tools
- Updated error handling to work with `execFile` API
- Improved security documentation

---

<!-- Older entries go below -->
