package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.util.ArrayList;

public class Dao {
// dao 로컬 테스트용
	public static void main(String[] args) {
//		Dao dao = new Dao();
//		ArrayList<DtoP1Products> productsList = dao.getProductsList(0);
//		for(DtoP1Products a : productsList) System.out.println(a);
		
//		DtoSelectedProduct selectedProduct = dao.getSelectedProduct(1);
//		System.out.println(selectedProduct);
		
//		ArrayList<DtoCategory> categoryList = dao.getCategoryList();
//		for(DtoCategory a : categoryList) System.out.println(a);
		
//		dao.pointCheck("010-1234-1234");
		
//		ArrayList<DtoIdPrice> dtoIdPrice = dao.getAllProductPrice();
//		for(DtoIdPrice a : dtoIdPrice) System.out.println(a);
		
//		System.out.println(dao.getPayId());
		
//		dao.payStep1("010-1234-5678", 2900, 0, "kakao");

//		System.out.println(dao.receipt1());

//		ArrayList<DtoReceipt2> list = dao.receipt2(104);
//		for(DtoReceipt2 a : list) System.out.println(a);
	}
	
	public ArrayList<DtoP1Products> getProductsList(int category_id) {
		DBUtil d = new DBUtil();
		ArrayList<DtoP1Products> productsList = new ArrayList<>();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = 
				"SELECT id, filename, name, price, special "
			+ 	"FROM products "
			+ 	"WHERE category_id = ? "
			+ 	"ORDER BY id";
		try {
			if(category_id == 0) {
				sql = 
					"SELECT id, filename, name, price, special " + 
					"FROM products " + 
					"WHERE special = 2 OR id in(3,51,70) ORDER BY id";
			}
			pstmt = d.getPstmt(con, sql);
			if(category_id != 0) pstmt.setInt(1, category_id);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				int id = rs.getInt("id");
				String filename = rs.getString("filename");
				String name = rs.getString("name").replace("디카페인 ", "");
				String price = NumberFormat.getInstance().format(rs.getInt("price"));
				int special = rs.getInt("special");
				DtoP1Products dto = new DtoP1Products(id, filename, name, price, special);
				productsList.add(dto);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		finally {
			d.close(con, pstmt, rs);
		}
		return productsList;
	}
	

	
	public DtoSelectedProduct getSelectedProduct(int id) { 
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		DtoSelectedProduct selectedProduct = null;
		String sql = 
				"SELECT filename, name, price, hot_ice, size_change, ice_amount, cream "
			+ 	"FROM products "
			+ 	"WHERE id = ? ";
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.setInt(1, id);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				String filename = rs.getString("filename");
				String name = rs.getString("name");
				int price = rs.getInt("price");
				int hotIce = rs.getInt("hot_ice");
				int sizeChange = rs.getInt("size_change");
				int iceAmount = rs.getInt("ice_amount");
				int cream = rs.getInt("cream");
				selectedProduct = new DtoSelectedProduct(filename, name, price, hotIce, sizeChange, iceAmount, cream);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		finally {
			d.close(con, pstmt, rs);
		}
		
		return selectedProduct;
	}

	public ArrayList<DtoCategory> getCategoryList() { 
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<DtoCategory> categoryList = new ArrayList<>();
		String sql = "SELECT category_id, name FROM categories ORDER BY category_id";
		try {
			pstmt = d.getPstmt(con, sql);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				int id = rs.getInt("category_id");
				String name = rs.getString("name");
				DtoCategory dto = new DtoCategory(id, name);
				categoryList.add(dto);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt, rs);
		}
		return categoryList;
	}
	
	public int pointCheck(String phoneNumber) {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(*) FROM customer WHERE phonenumber = ?";
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.setString(1, phoneNumber);
			rs = d.getRs(pstmt);
			rs.next();
			if(rs.getInt(1) == 0) {
				sql = "INSERT INTO customer (phonenumber, point) VALUES (?, 0)";
				pstmt = d.getPstmt(con, sql);
				pstmt.setString(1, phoneNumber);
				pstmt.execute();
				return 0;
			}
			d.close(pstmt, rs);
			sql = "SELECT point FROM customer WHERE phonenumber = ?";
			pstmt = d.getPstmt(con, sql);
			pstmt.setString(1, phoneNumber);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				return rs.getInt("point");
			}
			
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			d.close(con, pstmt, rs);
		}
		return 0;
	}
	
	public ArrayList<DtoIdPrice> getAllProductPrice() {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<DtoIdPrice> dtoIdPrice = new ArrayList<>();
		String sql = "SELECT id, price FROM products ORDER BY id";
		try {
			pstmt = d.getPstmt(con, sql);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				int id = rs.getInt("id");
				int price = rs.getInt("price");
				DtoIdPrice dto = new DtoIdPrice(id, price);
				dtoIdPrice.add(dto);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt, rs);
		}
		return dtoIdPrice;
	}
	

	public int getPayId() {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT MAX(payment_id) FROM payment";
		try {
			pstmt = d.getPstmt(con, sql);
			rs = d.getRs(pstmt);
			rs.next();
			return rs.getInt(1);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt, rs);
		}
		return 0;
	}
	
	public void payStep1(String phoneNumber, int totalPrice, int pointUsed, String pay_method, String takeout) {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO payment " + 
				"(payment_id, phonenumber, totalprice, pointused, amount, time, method, pointearn, takeout) " + 
				"VALUES (seq_payment.nextval, ?, ?, ?, ?, sysdate, ?, ?, ?)";
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.setString(1, phoneNumber);
			pstmt.setInt(2, totalPrice);
			pstmt.setInt(3, pointUsed);
			pstmt.setInt(4, totalPrice - pointUsed);
			pstmt.setString(5, pay_method);
			pstmt.setInt(6, (int)((totalPrice - pointUsed) * 0.05));
			pstmt.setString(7, takeout);
			pstmt.execute();
			d.close(pstmt);
			if(phoneNumber.equals("")) return;
			int resultPoint = (int)((totalPrice - pointUsed) * 0.05) - pointUsed;
			sql = "UPDATE customer SET point = point + ? WHERE phonenumber = ?";
			pstmt = d.getPstmt(con, sql);
			pstmt.setInt(1, resultPoint);
			pstmt.setString(2, phoneNumber);
			pstmt.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt);
		}
	}

	public void payStep2(ArrayList<DtoOrderList> orderList, int payId) {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO orderlist " + 
				"(payment_id, product_id, count, option_hotice, option_size, option_cream, option_iceamount) " + 
				"VALUES (?, ?, ?, ?, ?, ?, ?)";
		try {
			pstmt = d.getPstmt(con, sql);
			for(DtoOrderList dto : orderList) {
				pstmt.setInt(1, payId);
				pstmt.setInt(2, dto.getProductId());
				pstmt.setInt(3, dto.getCount());
				pstmt.setString(4, dto.getOption1());
				pstmt.setString(5, dto.getOption2());
				pstmt.setString(6, dto.getOption3());
				pstmt.setString(7, dto.getOption4());
				pstmt.addBatch();
			}
			pstmt.executeBatch();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt);
		}
	}
	public DtoReceipt1 receipt1() {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		DtoReceipt1 dto = null;
		String sql =  
			"SELECT payment_id, phoneNumber, totalprice, " + 
			"TO_CHAR(time, 'YYYY-MM-DD HH24:MI:SS') time, pointearn, takeout " + 
			"FROM payment  " + 
			"WHERE payment_id = (SELECT MAX(payment_id) FROM payment)";
		try {
			pstmt = d.getPstmt(con, sql);
			rs = d.getRs(pstmt);
			rs.next();
			int payId = rs.getInt("payment_id");
			String phoneNumber = rs.getString("phonenumber");
			String payTime = rs.getString("time");
			int totalPrice = rs.getInt("totalprice");
			int pointearn = rs.getInt("pointearn");
			String takeout = rs.getString("takeout");
			dto = new DtoReceipt1(payId, phoneNumber, payTime, totalPrice, pointearn, takeout);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt, rs);
		}
		return dto;
	}
	public ArrayList<DtoReceipt2> receipt2(int payId) {
		DBUtil d = new DBUtil();
		Connection con = d.getCon();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<DtoReceipt2> list = new ArrayList<>();
		String sql =  
			"SELECT p.name, p.price, o.count, o.option_hotice, o.option_size, o.option_cream, o.option_iceamount " +
			"FROM orderlist o " + 
			"JOIN products p ON p.id = o.product_id " + 
			"WHERE o.payment_id = ?";
		try {
			pstmt = d.getPstmt(con, sql);
			pstmt.setInt(1, payId);
			rs = d.getRs(pstmt);
			while(rs.next()) {
				String name = rs.getString("name");
				int price = rs.getInt("price");
				int count = rs.getInt("count");
				String option1 = rs.getString("option_hotice");
				String size = rs.getString("option_size");
				String option3 = rs.getString("option_cream");
				String option4 = rs.getString("option_iceamount");
				StringBuilder sb = new StringBuilder();
				if (option1 != null) sb.append("└옵션 : ").append(option1);
				if (size != null) sb.append(", ").append(size);
				if (option3 != null) sb.append(", ").append(option3);
				if (option4 != null) sb.append(", ").append(option4);
				String option = sb.toString();
				DtoReceipt2 dto = new DtoReceipt2(name, price, count, option, size);
				list.add(dto);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			d.close(con, pstmt, rs);
		}
		return list;
	}
}
