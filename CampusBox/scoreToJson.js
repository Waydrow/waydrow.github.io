/*将成绩html格式转为 JSON 数据格式*/

/*以下代码请勿尝试修改!!!切记 切记!!!*/
/*否则自行承担后果<=.=>*/

jQuery(document).ready(function($) {

	var semester;
	var info; //成绩信息等

	var course;
	var score;
	var value; //学分

	var courseStr = "";
	var semesterStr = "";
	var finalJSON = "[";

	for (var i = 0; i < $('table').length; i++) {
		semesterStr = "";
		courseStr = "";
		if (i % 2 == 0) {
			semester = $($($('table')[i]).find('td')[0]).text().trim();
			semester = semester.substring(5);
		} else {

			var tr = $($('table')[i]).find('tbody tr');
			// console.log(tr)
			for (var j = 0; j < tr.length; j++) {
				course = $($(tr[j]).children('td')[1]).text().trim();
				course = course.substring(course.indexOf(']') + 1)
				value = $($(tr[j]).children('td')[2]).text().trim();
				score = $($(tr[j]).children('td')[6]).text().trim();

				// console.log("course: "+course+" value: "+value+" score: "+score)

				courseStr += "{" + "\"course\"\: " + "\"" + course + "\"," + "\"value\"\: " + "\"" + value + "\"," + "\"score\"\: " + "\"" + score + "\"" + "}";
				if (j < tr.length - 1) {
					courseStr += ",";
				}
			}
			// console.log(courseStr)
			semesterStr += "{" + "\"semester\"\: " + "\"" + semester + "\"," + "\"info\"\: " + "[" + courseStr + "]" + "}";
			if (i < $('table').length - 1) {
				semesterStr += ",";
			}
			
			finalJSON += semesterStr;
		}

	}
	finalJSON += "]";
	document.write(finalJSON)
	try {
		console.log("该代码请勿尝试修改!!!切记 切记!!!\n否则自行承担后果<=.=>");
	} catch(e) {
		console.log(e);
	}
});