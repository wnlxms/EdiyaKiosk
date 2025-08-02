package servlet;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.Dao;
import db.DtoReceipt1;
import db.DtoReceipt2;
import db.LogVisit;

@WebServlet("/Receipt")
public class Receipt extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println(LogVisit.getIp(request) + " "+ LogVisit.getTime() + " 영수증페이지 실행됨");
		Dao dao = new Dao();
		DtoReceipt1 dto = dao.receipt1();
		ArrayList<DtoReceipt2> list = dao.receipt2(dto.getPayId());
		if(dto.getPhoneNumber() != null) {
			String s = dto.getPhoneNumber();
			dto.setPhoneNumber((s.substring(0, 6) + "**-**" + s.substring(11)));
		}
		request.setAttribute("dto", dto);
		request.setAttribute("list", list);
		request.getRequestDispatcher("receipt.jsp").forward(request, response);
	}
}
