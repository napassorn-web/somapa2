package com.upload.upload.model;

import lombok.Data;

@Data
public class UploadResponse {
	private int row;
    private String firstName;
    private String lastName;
    private String gender;
    private String dateOfBirth;
    private String nationality;
    private String columnInvalid;
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	public String getColumnInvalid() {
		return columnInvalid;
	}
	public void setColumnInvalid(String columnInvalid) {
		this.columnInvalid = columnInvalid;
	}
}
