
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
//	$("#formItem").submit();
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
			 url : "DoctorAPI",
			 type : type,
			 data : $("#formDoctor").serialize(),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onItemSaveComplete(response.responseText, status);
			 }
	});
});

function onItemSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formDoctor")[0].reset();
}



//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
	 $("#doctorCode").val($(this).closest("tr").find('td:eq(0)').text());
	 $("#doctorName").val($(this).closest("tr").find('td:eq(1)').text());
	 $("#doctorCharge").val($(this).closest("tr").find('td:eq(2)').text());
	 $("#doctorDesc").val($(this).closest("tr").find('td:eq(3)').text());
}); 

//REMOVE==========================================
$(document).on("click", ".btnRemove", function(event)
{
		 $.ajax(
		 {
			 url : "DoctorAPI",
			 type : "DELETE",
			 data : "doctorID=" + $(this).data("itemid"),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onItemDeleteComplete(response.responseText, status);
			 }
		 });
});

function onItemDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			 $("#alertSuccess").text("Successfully deleted.");
			 $("#alertSuccess").show();
			 $("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
			{
				 $("#alertError").text(resultSet.data);
				 $("#alertError").show();
			}
	} else if (status == "error")
	{
		 $("#alertError").text("Error while deleting.");
		 $("#alertError").show();
	} else
	{
		 $("#alertError").text("Unknown error while deleting..");
		 $("#alertError").show();
	}
}

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
		return "Insert doctor Description.";
	 }
	return true;
}

