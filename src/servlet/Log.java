package servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.LogDto;
import db.LogVisit;

@WebServlet("/Log")
public class Log extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ArrayList<LogDto> list = new LogVisit().getLog();
		new LogVisit().logUpdate();
		request.setAttribute("list", list);
		request.getRequestDispatcher("log.jsp").forward(request, response);
	}
}
