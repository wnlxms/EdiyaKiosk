package db;

public class DtoSelectedProduct {
	private String filename;
	private String name;
	private int price;
	private int hotIce;
	private int sizeChange;
	private int iceAmount;
	private int cream;

	public DtoSelectedProduct(String filename, String name, int price, int hotIce, int sizeChange, int iceAmount,
			int cream) {
		this.filename = filename;
		this.name = name;
		this.price = price;
		this.hotIce = hotIce;
		this.sizeChange = sizeChange;
		this.iceAmount = iceAmount;
		this.cream = cream;
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getHotIce() {
		return hotIce;
	}

	public void setHotIce(int hotIce) {
		this.hotIce = hotIce;
	}

	public int getSizeChange() {
		return sizeChange;
	}

	public void setSizeChange(int sizeChange) {
		this.sizeChange = sizeChange;
	}

	public int getIceAmount() {
		return iceAmount;
	}

	public void setIceAmount(int iceAmount) {
		this.iceAmount = iceAmount;
	}

	public int getCream() {
		return cream;
	}

	public void setCream(int cream) {
		this.cream = cream;
	}

	@Override
	public String toString() {
		return "DtoSelectedProduct [filename=" + filename + ", name=" + name + ", price=" + price + ", hotIce=" + hotIce
				+ ", sizeChange=" + sizeChange + ", iceAmount=" + iceAmount + ", cream=" + cream + "]";
	}

}
