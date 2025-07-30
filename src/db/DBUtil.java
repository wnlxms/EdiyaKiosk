package db;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DBUtil {

	public Connection getCon() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.out.println("class.forname에서 오류남");
		}
		Properties prop = new Properties();
		InputStream is = DBUtil.class.getClassLoader().getResourceAsStream("db/db.properties");
		String url = "";
		String id = "";
		String pw = "";
		try {
			prop.load(is);
			url = prop.getProperty("db.url");
			id = prop.getProperty("db.user");
			pw = prop.getProperty("db.pw");
		} catch (IOException e) {
			e.printStackTrace();
		}

		Connection con = null;
		try {
			con = DriverManager.getConnection(url, id, pw);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("con에서 오류남");
		}
		return con;
	}

	public PreparedStatement getPstmt(Connection con, String sql) {
		PreparedStatement pstmt = null;
		if (con != null)
			try {
				pstmt = con.prepareStatement(sql);
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("pstmt에서 오류남");
			}
		return pstmt;
	}

	public ResultSet getRs(PreparedStatement pstmt) {
		ResultSet rs = null;
		try {
			rs = pstmt.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("rs에서 오류남");
		}
		return rs;
	}

	public void close(AutoCloseable... resources) {
		for (AutoCloseable res : resources) {
			if (res != null) {
				try {
					res.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
}