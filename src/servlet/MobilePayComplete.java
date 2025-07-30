package servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import db.Dao;
import db.DtoOrderList;

@WebServlet("/MobilePayComplete")
public class MobilePayComplete extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		Dao dao = new Dao();
		String phoneNumber = request.getParameter("phoneNumber");
		int totalPrice = Integer.parseInt(request.getParameter("totalPrice"));
		int pointUsed = Integer.parseInt(request.getParameter("pointUsed"));
		String payMethod = request.getParameter("payMethod");
		String takeout = request.getParameter("takeout");
		JSONArray jsonarr = null;
		ArrayList<DtoOrderList> orderList = new ArrayList<>();
		
		try {
			jsonarr = (JSONArray)new JSONParser().parse(request.getParameter("cart"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		for(int i = 0; i < jsonarr.size(); i++) {
			JSONObject jsonobj = (JSONObject)jsonarr.get(i);
			int productId = Integer.parseInt((String)jsonobj.get("id"));
			int count = ((Long)jsonobj.get("count")).intValue();
			String option1 = (String)jsonobj.get("hotice");
			String option2 = (String)jsonobj.get("size");
			String option3 = (String)jsonobj.get("cream");
			String option4 = (String)jsonobj.get("iceamount");
			DtoOrderList dto = new DtoOrderList(productId, count, option1, option2, option3, option4);
			orderList.add(dto);
		}
		dao.payStep1(phoneNumber, totalPrice, pointUsed, payMethod, takeout);
		int payId = dao.getPayId();
		System.out.println(payId);
		dao.payStep2(orderList, payId);
		response.sendRedirect("Receipt");
		
		
		
	}

}
