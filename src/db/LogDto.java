package db;

public class LogDto {
	private String log;
	private boolean isNew;

	public LogDto(String log, boolean isNew) {
		this.log = log;
		this.isNew = isNew;
	}

	public String getLog() {
		return log;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public boolean getIsNew() {
		return isNew;
	}

	public void setNew(boolean isNew) {
		this.isNew = isNew;
	}

	@Override
	public String toString() {
		return "LogDto [log=" + log + ", isNew=" + isNew + "]";
	}
}