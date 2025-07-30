package db;

public class DtoReceipt1 {
	private int payId;
	private String phoneNumber;
	private String payTime;
	private int totalPrice;
	private int pointearn;
	private String takeout;

	public DtoReceipt1(int payId, String phoneNumber, String payTime, int totalPrice, int pointearn, String takeout) {
		super();
		this.payId = payId;
		this.phoneNumber = phoneNumber;
		this.payTime = payTime;
		this.totalPrice = totalPrice;
		this.pointearn = pointearn;
		this.takeout = takeout;
	}

	public int getPayId() {
		return payId;
	}

	public void setPayId(int payId) {
		this.payId = payId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getPayTime() {
		return payTime;
	}

	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getPointearn() {
		return pointearn;
	}

	public void setPointearn(int pointearn) {
		this.pointearn = pointearn;
	}

	public String getTakeout() {
		return takeout;
	}

	public void setTakeout(String takeout) {
		this.takeout = takeout;
	}

	@Override
	public String toString() {
		return "DtoReceipt1 [payId=" + payId + ", phoneNumber=" + phoneNumber + ", payTime=" + payTime + ", totalPrice="
				+ totalPrice + ", pointearn=" + pointearn + ", takeout=" + takeout + "]";
	}
}