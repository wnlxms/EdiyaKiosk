package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import db.Dao;
import db.LogVisit;

@WebServlet("/AjaxPointCheck")
public class AjaxPointCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		System.out.println(LogVisit.getIp(request) + " "+ LogVisit.getTime() + " 포인트조회 실행됨");
		String phoneNumber = request.getParameter("phoneNumber");
		Dao dao = new Dao();
		int point = dao.pointCheck(phoneNumber);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("point", point);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonObject.toJSONString());
	}

}
