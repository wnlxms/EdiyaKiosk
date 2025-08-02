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
import db.DtoIdPrice;
import db.LogVisit;

@WebServlet("/AjaxAudit")
public class AjaxAudit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		System.out.println(LogVisit.getIp(request) + " "+ LogVisit.getTime() + " 데이터검증 실행됨");
		Dao dao = new Dao();
		String phoneNumber = request.getParameter("phoneNumber");
		int dbPoint = 0;
		if(!(phoneNumber.equals(""))) dbPoint = dao.pointCheck(phoneNumber);
		
		JSONArray jsonarr = null;
		ArrayList<DtoIdPrice> dtoIdPrice = dao.getAllProductPrice();
		try {
			jsonarr = (JSONArray)new JSONParser().parse(request.getParameter("cart"));
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("json에서 오류남");
		}
		int dbTotalPrice = 0;
		for(int i = 0; i < jsonarr.size(); i++) {
			JSONObject jsonobj = (JSONObject)jsonarr.get(i);
			int id = Integer.parseInt((String)jsonobj.get("id"));
			boolean extra = "Large".equals((String)jsonobj.get("size"));
			int count = ((Long)jsonobj.get("count")).intValue();
			int dbPrice = dtoIdPrice.get(id-1).getPrice();
			dbPrice = extra ? dbPrice + 1200 : dbPrice;
			dbTotalPrice += dbPrice * count;
		}
		int payId = dao.getPayId();
		
		JSONObject obj = new JSONObject();
		obj.put("dbTotalPrice", dbTotalPrice);
		obj.put("dbPoint", dbPoint);
		obj.put("merchant_uid", "testpayuid_" + payId);
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(obj.toJSONString());
	}

}