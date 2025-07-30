package db;

public class DtoReceipt2 {

	private String name;
	private int price;
	private int count;
	private String option;
	private String size;

	public DtoReceipt2(String name, int price, int count, String option, String size) {
		this.name = name;
		this.price = price;
		this.count = count;
		this.option = option;
		this.size = size;
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

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "DtoReceipt2 [name=" + name + ", price=" + price + ", count=" + count + ", option=" + option + ", size="
				+ size + "]";
	}

}
