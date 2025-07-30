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

import db.Dao;
import db.DtoP1Products;

@WebServlet("/AjaxCategoryChange")
public class AjaxCategoryChange extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int categoryId = Integer.parseInt(request.getParameter("categoryid"));
		Dao dao = new Dao();
		ArrayList<DtoP1Products> productsList = dao.getProductsList(categoryId);
		JSONArray jsonArray = new JSONArray();
		for(DtoP1Products a : productsList) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", a.getId());
			jsonObject.put("filename", a.getFilename());
			jsonObject.put("name", a.getName());
			jsonObject.put("price", a.getPrice());
			jsonObject.put("special", a.getSpecial());
			jsonArray.add(jsonObject);
		}
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(jsonArray.toJSONString());
		
		
	}

}