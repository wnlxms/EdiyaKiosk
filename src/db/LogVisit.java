package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

public class LogVisit {
	public void logVisit(HttpServletRequest request) {
		String ip = getIp(request);
		String userAgent = request.getHeader("User-Agent");
		String browser = getBrowser(userAgent);
		String device = getDevice(userAgent);

		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO log (id, time, ip, browser, device) VALUES (seq_log.nextval, sysdate, ?, ?, ?)";
		String time = getTime();
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
	
	public static String getIp(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
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

	public ArrayList<LogDto> getLog(){
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<LogDto> list = new ArrayList<>();
		String sql = 
				"SELECT id, TO_CHAR(time + 9/24, 'MM\"월\" DD\"일\" HH24\"시\" MI\"분\" SS\"초\"') AS time, ip, browser, device, is_new " + 
				"FROM log " + 
				"ORDER BY id DESC";
		try {
			pstmt = d.getPstmt(con, sql);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				int id = rs.getInt("id");
				String time = rs.getString("time");
				String ip = rs.getString("ip");
				String browser = rs.getString("browser");
				String device = rs.getString("device");
				boolean isNew = "0".equals(rs.getString("is_new"));
				String str = "ID: " + id + ", 시간: " + time + ", IP: " + ip + ", 브라우저: " + browser + ", 디바이스: " + device;
				list.add(new LogDto(str, isNew));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			d.close(con, pstmt, rs);
		}		
		return list;
	}
	
	public void logUpdate() { 
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		String sql = 
				"UPDATE log " + 
				"SET is_new = 0 " + 
				"WHERE is_new IS NULL";
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.executeUpdate();
		} catch(SQLException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		finally {
			d.close(con, pstmt);
		}
		
	}

	public static String getTime() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd HH:mm:ss");
		return now.format(formatter);
	}
}
