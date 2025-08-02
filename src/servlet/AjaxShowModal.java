package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import db.Dao;
import db.DtoSelectedProduct;
import db.LogVisit;

@WebServlet("/AjaxShowModal")
public class AjaxShowModal extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println(LogVisit.getIp(request) + " "+ LogVisit.getTime() + " 상품상세모달 실행됨");
		int id = Integer.parseInt(request.getParameter("productid"));
		Dao dao = new Dao();
		DtoSelectedProduct selectedproduct = dao.getSelectedProduct(id);
		JSONObject jsonObject = new JSONObject();
	    jsonObject.put("filename", selectedproduct.getFilename());
	    jsonObject.put("name", selectedproduct.getName());
	    jsonObject.put("price", selectedproduct.getPrice());
	    jsonObject.put("hotIce", selectedproduct.getHotIce());
	    jsonObject.put("sizeChange", selectedproduct.getSizeChange());
	    jsonObject.put("iceAmount", selectedproduct.getIceAmount());
	    jsonObject.put("cream", selectedproduct.getCream());
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(jsonObject.toJSONString());
		
	}

}
