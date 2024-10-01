package com.upload.upload.services;

public class ErrorDetail {
	private int row;
    private String columnInvalid;

    public ErrorDetail(int row, String columnInvalid) {
        this.setRow(row);
        this.setColumnInvalid(columnInvalid);
    }

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public String getColumnInvalid() {
		return columnInvalid;
	}

	public void setColumnInvalid(String columnInvalid) {
		this.columnInvalid = columnInvalid;
	}

}
