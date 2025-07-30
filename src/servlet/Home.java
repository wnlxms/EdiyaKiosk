package servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.Dao;
import db.DtoCategory;
import db.DtoP1Products;
import db.LogVisit;

@WebServlet("/Home")
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Dao dao = new Dao();
		ArrayList<DtoP1Products> productsList = dao.getProductsList(0);
		ArrayList<DtoCategory> categoryList = dao.getCategoryList();
		new LogVisit().logvisit(request);
		request.setAttribute("productsList", productsList);
		request.setAttribute("categoryList", categoryList);
		request.getRequestDispatcher("main.jsp").forward(request, response);
	}
}
