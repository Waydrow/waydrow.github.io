/*将课程表html格式转为 JSON 数据格式*/

/*以下代码请勿尝试修改!!!切记 切记!!!*/
/*否则自行承担后果<=.=>*/

jQuery(document).ready(function($) {

	var day;
	var course;

	var strDay = "";
	var strCourse = "";
	var strJSON = "";

	var className;
	var classTwo;

	var otherInfo;

	var teacher;
	var time;
	var room;

	for (var i = 1; i < 8; i++) {
		strDay += "{" + "\"day\"\: " + "\"" + i + "\"," + "\"course\"\: " + "[" ;
		for (var j = 1; j < 6; j++) {
			var id = "#k" + i + j;
			
			if ($(id).hasClass('div_nokb') || $(id).text().indexOf("未选中")!=-1) {
				continue;
			} else {
				if($($(id).find("b")).length>1) {
					className = $($(id).find('b')[0]).text().trim();
					classTwo = $($(id).find('b')[1]).text().trim();

					var s1 = $($(id).find('div')[0]).text().trim();
					s1 = s1.substring(className.length).trim();
					var s2 = $($(id).find('div')[1]).text().trim();
					s2 = s2.substring(classTwo.length).trim();

					var teacher1 = s1.substring(0, s1.indexOf(" "));
					var teacher2 = s2.substring(0, s2.indexOf(" "));

					var time1 = s1.substring(s1.indexOf("-")-1 , s1.indexOf("]")+1);
					var time2 = s2.substring(s2.indexOf("-")-1 , s2.indexOf("]")+1);

					var tempS1 = s1.substring(s1.indexOf("]")+3 , s1.length);
					var tempS2 = s2.substring(s2.indexOf("]")+3 , s2.length);

					var room1 = tempS1.substring(0, tempS1.indexOf("预")!=-1?tempS1.indexOf("中")-4:tempS1.indexOf("中")-3);
					var room2 = tempS2.substring(0, tempS2.indexOf("预")!=-1?tempS2.indexOf("中")-4:tempS2.indexOf("中")-3);

					// console.log(className+" "+teacher1+" "+time1+" "+room1)
					// console.log(classTwo+" "+teacher2+" "+time2+" "+room2)

					strCourse += "{" + "\"id\"\: " + "\"" + i+j + "\"," + "\"subject\"\: " + "\"" + className + "\","
						+ "\"teacher\"\: " + "\"" + teacher1 + "\"," + "\"room\"\: " + "\"" + room1 + "\"" + "}" ;
					strCourse += "{" + "\"id\"\: " + "\"" + i+j + "\"," + "\"subject\"\: " + "\"" + classTwo + "\","
						+ "\"teacher\"\: " + "\"" + teacher2 + "\"," + "\"room\"\: " + "\"" + room2 + "\"" + "}" ;
					if(j<5) strCourse+=",";

				} else {
					className = $(id).find('b').text().trim();

					var temp = $(id).find('div').text().trim();
					temp = temp.substring(className.length).trim();

					teacher = temp.substring(0, temp.indexOf(" "));
					time = temp.substring(temp.indexOf("-")-1 , temp.indexOf("]")+1);
					var s = temp.substring(temp.indexOf("]")+3 , temp.length);
					room = s.substring(0, s.indexOf("预")!=-1?s.indexOf("中")-4:s.indexOf("中")-3);

					strCourse += "{" + "\"id\"\: " + "\"" + i+j + "\"," + "\"subject\"\: " + "\"" + className + "\","
						+ "\"teacher\"\: " + "\"" + teacher + "\"," + "\"room\"\: " + "\"" + room + "\"" + "}" ;

					if(j<5) strCourse+=",";

					// console.log(className+" "+teacher+" "+time+" "+room)
				}
			}
		}

		strDay += strCourse + "]}";
		if(i<7) strDay+="," ;
	}

	strJSON = "[" + strDay + "]";

	console.log("该代码请勿尝试修改!!!切记 切记!!!\n否则自行承担后果<=.=>");
	document.write(strJSON);
});