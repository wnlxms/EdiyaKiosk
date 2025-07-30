package db;

public class DtoP1Products {
	private int id;
	private String filename;
	private String name;
	private String price;
	private int special;

	public DtoP1Products(int id, String filename, String name, String price, int special) {
		this.id = id;
		this.filename = filename;
		this.name = name;
		this.price = price;
		this.special = special;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public int getSpecial() {
		return special;
	}

	public void setSpecial(int special) {
		this.special = special;
	}

	@Override
	public String toString() {
		return "DtoP1Products [id=" + id + ", filename=" + filename + ", name=" + name + ", price=" + price
				+ ", special=" + special + "]";
	}

}