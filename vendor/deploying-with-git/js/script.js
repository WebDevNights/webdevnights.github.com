// Map s content to config data
var mySlides = [

	{ content : "#gs_smoke",
		bgcolor : "black",
		onShow  : gs_smoke_start,
		onClose : gs_smoke_stop
	},
	{ content : "#welcome"          },
	{ content : "#outline"          },
	{ content : "#why"              },
	{ content : "#why_1"            },
	{ content : "#why_2"            },
	{ content : "#why_3"            },
	{ content : "#intertitle_type1" },
	{ content : "#bare"             },
	{ content : "#bare_dir_1"       },
	{ content : "#bare_dir_2"       },

	{ content : "#hooks"            },
	{ content : "#useful"           },
	{ content : "#step1"            },
	{ content : "#step2"            },
	{ content : "#step3"            },
	{ content : "#step4"            },

	{ content : "#intertitle_type2" },
	{ content : "#separate"         },
	{ content : "#same_1"           },
	{ content : "#same_1a"          },
	{ content : "#same_2"           },
	{ content : "#same_3"           },
	{ content : "#same_4"           },

    { content : "#intertitle_type3" },
    { content : "#type3_a"          },
    { content : "#type3_b"          },
    { content : "#pointers"         },

	{ content : "#pre_end"          },
	{ content : "#end"              }

];


$(function beginEverything () {


	//
	// Init slideshow with our slide config
	//
	var slideshow = new Slideshow ("#slideshow", mySlides, {

    	clickToChange : true,
		globalOnShow  : function () {},
		globalOnClose : function () {}

	});



});
