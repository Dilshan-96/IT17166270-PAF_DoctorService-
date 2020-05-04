
$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid-------------------------
	$("#formItem").submit();
});

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
	 $("#doctorCode").val($(this).closest("tr").find('td:eq(0)').text());
	 $("#doctorName").val($(this).closest("tr").find('td:eq(1)').text());
	 $("#doctorCharge").val($(this).closest("tr").find('td:eq(2)').text());
	 $("#doctorDesc").val($(this).closest("tr").find('td:eq(3)').text());
}); 

//CLIENTMODEL=========================================================================
function validateItemForm()
{
	// CODE
	if ($("#doctorCode").val().trim() == "")
	{
		return "Insert doctor Code.";
	}
	
	// NAME
	if ($("#doctorName").val().trim() == "")
	 {
		return "Insert doctor Name.";
	 } 
	
	// PRICE-------------------------------
	if ($("#doctorCharge").val().trim() == "")
	 {
		return "Insert doctor Charge.";
	 }
	// is numerical value
	var tmpPrice = $("#doctorCharge").val().trim();
	if (!$.isNumeric(tmpPrice))
	 {
		return "Insert a numerical value for doctor Charge.";
	 }
	// convert to decimal price
	 $("#doctorCharge").val(parseFloat(tmpPrice).toFixed(2));
	// DESCRIPTION------------------------
	if ($("#doctorDesc").val().trim() == "")
	 {
		return "Insert doctor Desc.";
	 }
	return true;
}

