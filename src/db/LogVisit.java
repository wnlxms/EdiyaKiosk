package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;

public class LogVisit {
	public void logvisit(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		String userAgent = request.getHeader("User-Agent");
		String browser = getBrowser(userAgent);
		String device = getDevice(userAgent);

		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO log (id, time, ip, browser, device) VALUES (seq_log.nextval, sysdate, ?, ?, ?)";
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일 HH시 mm분 ss초");
		String time = now.format(formatter);
		System.out.printf("접속시간 : %s 접속ip주소 : %s 접속브라우저 : %s 접속 디바이스 : %s\n\n",time, ip, browser, device);
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.setString(1, ip);
			pstmt.setString(2, browser);
			pstmt.setString(3, device);
			pstmt.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt);
		}
	}
	
	public static String getBrowser(String userAgent) {
		if (userAgent == null)
			return "Unknown";
		userAgent = userAgent.toLowerCase();
		if (userAgent.contains("edg")) return "Edge";
		if (userAgent.contains("chrome")) return "Chrome";
		if (userAgent.contains("safari")) return "Safari";
		if (userAgent.contains("firefox")) return "Firefox";
		if (userAgent.contains("msie") || userAgent.contains("trident")) return "Internet Explorer";
		return "Other";
	}

	public static String getDevice(String userAgent) {
		if (userAgent == null) return "Unknown";
		userAgent = userAgent.toLowerCase();

		if (userAgent.contains("mobi") || userAgent.contains("android") || userAgent.contains("iphone") || userAgent.contains("ipad")) return "Mobile";
		return "PC";
	}

}
