(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/** Variables declaraions */

var milk_adulteration_stage, tick, exp_canvas;

var hcl_drop_flag, resorcinol_put_flag, h2so4_drop_flag, milk_on_water_bath_flag;

var milk_beaker_current_x, milk_beaker_current_y, hot_water_drop_flag;

var sugar_presence, sugar_absence, benzoic_acid_presence, salicylic_acid_presence, acid_absence;

var starch_presence, starch_absence, soap_presence, soap_absence, clock_label;

var drop_hcl_count, drop_hcl_timer, put_resorcinol_count, put_resorcinol_timer, random_color, smoke_anim_count, smoke_anim_timer;

var drop_h2so4_timer, drop_h2so4_count, drop_fecl3_timer, drop_fecl3_count, solution_anim_count, solution_anim_timer;

var drop_iodine_count, drop_iodine_timer, drop_hot_water_count, drop_hot_water_timer, drop_phenolphthalein_timer, drop_phenolphthalein_count;

var anim_frame, anim_width, anim_object, smoke_anim_frame, smoke_anim_width, resorcinol_anim_frame, resorcinol_anim_width;

var measuring_jar_anim_frame, measuring_jar_anim_width;

/** Arrays declarations */
var help_array = adulteration_array = color_solution_array = color_solution_anim_array = [];

/** Createjs shapes declarations */
var fecl3_rect = new createjs.Shape();
var phenolphthalein_rect = new createjs.Shape();
var hcl_rect = new createjs.Shape();
var h2so4_rect = new createjs.Shape();
var iodine_rect = new createjs.Shape();
var resorcinol_rect = new createjs.Shape();
var hot_water_rect = new createjs.Shape();
var mask_milk_rect = new createjs.Shape();
var hit_solution_rect = new createjs.Shape();
var water_bath_rect = new createjs.Shape();
var dropper_solution_mask = new createjs.Shape();
var smoke_mask_rect = new createjs.Shape();
var resorcinol_mask_rect = new createjs.Shape();

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            milk_adulteration_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);       
			/** Preloading the images */
			queue.loadManifest([{
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock",
				src: "././images/clock.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_needle",
				src: "././images/clock_needle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "drop_yellow",
				src: "././images/drop_FeCl3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "drop_white",
				src: "././images/drop_phenophthalein.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "drop_brown",
				src: "././images/drop_iodine.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dropper_solution_yellow",
				src: "././images/dropper_solution_FeCl3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dropper_solution_white",
				src: "././images/dropper_solution_phenophthalein.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dropper_solution_brown",
				src: "././images/dropper_solution_iodine.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dropper",
				src: "././images/dropper.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "measuring_jar_anim",
				src: "././images/measuring_jar_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "resorcinol_anim",
				src: "././images/resorcinol_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "testtube_solution",
				src: "././images/testtube_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "testtube_red_solution",
				src: "././images/testtube_red_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "testtube",
				src: "././images/testtube.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "testtube_stand_top",
				src: "././images/testtube_stand_top.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_bath_closer",
				src: "././images/water_bath_closer.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "measuring_jar",
				src: "././images/measuring_jar.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "resorcinol_in_spoon",
				src: "././images/resorcinol_in_spoon.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_bath_cover",
				src: "././images/water_bath_cover.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "yellow_solution_anim",
				src: "././images/yellow_solution_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "violet_solution_anim",
				src: "././images/violet_solution_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_solution_anim",
				src: "././images/blue_solution_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "smoke_anim",
				src: "././images/smoke_anim.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
            queue.installPlugin(createjs.Sound);            
            queue.on("complete", handleComplete, this);            
            loadingProgress(queue,milk_adulteration_stage,exp_canvas.width);            
            
            milk_adulteration_stage.enableDOMEvents(true);
            milk_adulteration_stage.enableMouseOver();
            createjs.Touch.enable(milk_adulteration_stage);
            tick = setInterval(updateTimer, 100); /** Stage update function in a timer */

            function handleComplete() { 
                /** Loading images, text and containers */
                loadImages(queue.getResult("background"), "background", 0, 0, "", 0, milk_adulteration_stage, 1);
                createSolutionRect(smoke_mask_rect, 390, 240, 50, 200, ""); /** Rect for smoke animation mask */
                createSolutionRect(resorcinol_mask_rect, 195, 350, 120, 250, ""); /** Rect for resorcinol putting animation mask */
                setText("FeCl3_text", 78, 278, _("FeCl3"), "black", 1.1, milk_adulteration_stage); /** Label for FeCl3 */
                setText("phenolphthalein_text", 12, 138, _("Phenolphthalein"), "black", 1.1, milk_adulteration_stage); /** Label for Phenolphthalein */
                setText("hcl_text", 180, 138, _("Conc. HCl"), "black", 1.1, milk_adulteration_stage); /** Label for Conc. HCl */
                setText("h2so4_text", 303, 138, _("Conc. H2SO4"), "black", 1.1, milk_adulteration_stage); /** Label for Conc. H2SO4 */
                setText("iodine_text", 457, 138, _("Iodine"), "black", 1.1, milk_adulteration_stage); /** Label for Iodine */
                setText("resorcinol_text", 562, 138, _("Resorcinol"), "black", 1.1, milk_adulteration_stage); /** Label for Resorcinol */
                setText("hot_water_text", 562, 278, _("Hot water"), "black", 1.1, milk_adulteration_stage); /** Label for Hot water */
                /** Rect for testube solution masking */
                milk_adulteration_stage.addChild(dropper_solution_mask);
                dropper_solution_mask.x = 350;
                dropper_solution_mask.y = 95;
                dropper_solution_mask.graphics.beginFill("red").drawRect(0, 0, 10, 50).command;
                dropper_solution_mask.alpha = 0.01;
                createSolutionRect(fecl3_rect, 65, 165, 50, 110, "pointer"); /** Rect for click, drag and drop fecl3 solution */
                createSolutionRect(phenolphthalein_rect, 65, 45, 50, 100, "pointer"); /** Rect for click, drag and drop phenolphthalein solution */        
                createSolutionRect(hcl_rect, 192, 45, 50, 100, "pointer"); /** Rect for click, drag and drop hcl solution */
                createSolutionRect(h2so4_rect, 335, 45, 50, 100, "pointer"); /** Rect for click, drag and drop h2so4 solution */
                createSolutionRect(iodine_rect, 455, 45, 50, 100, "pointer"); /** Rect for click, drag and drop iodine solution */
                createSolutionRect(resorcinol_rect, 568, 75, 130, 50, "pointer"); /** Rect for click, drag and drop resorcinol */
                createSolutionRect(hot_water_rect, 555, 170, 100, 110, "pointer"); /** Rect for click, drag and drop hot_water */
                createSolutionRect(hit_solution_rect, 150, 350, 150, 150, ""); /** Rect for hit with the measuring jar and dropper */
                loadImages(queue.getResult("drop_yellow"), "drop_yellow", 205, 427, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("drop_white"), "drop_white", 205, 427, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("drop_brown"), "drop_brown", 205, 427, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("dropper_solution_yellow"), "dropper_solution_yellow", 86, 180, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("dropper_solution_white"), "dropper_solution_white", 83, 60, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("dropper_solution_brown"), "dropper_solution_brown", 475, 60, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("dropper"), "dropper", 83, 150, "move", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("smoke_anim"), "smoke_anim", 370, 170, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("measuring_jar_anim"), "measuring_jar_anim", 190, 355, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("resorcinol_anim"), "resorcinol_anim", 200, 355, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("testtube_solution"), "testtube_solution", 197, 470, "", 0, milk_adulteration_stage, 0.95);
                loadImages(queue.getResult("testtube_red_solution"), "testtube_red_solution", 399, 430, "", 0, milk_adulteration_stage, 0.95);
                loadImages(queue.getResult("blue_solution_anim"), "blue_solution_anim", 196, 538, "", 0, milk_adulteration_stage, 0.9);
                loadImages(queue.getResult("yellow_solution_anim"), "yellow_solution_anim", 196, 533, "", 0, milk_adulteration_stage, 0.9);
                loadImages(queue.getResult("violet_solution_anim"), "violet_solution_anim", 196, 533, "", 0, milk_adulteration_stage, 0.9);
                loadImages(queue.getResult("testtube"), "testtube", 10, 442, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("testtube_stand_top"), "testtube_stand_top", 52, 520, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("water_bath_closer"), "water_bath_closer", 390, 429, "", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("measuring_jar"), "measuring_jar", 220, 90, "move", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("resorcinol_in_spoon"), "resorcinol_in_spoon", 582, 35, "move", 0, milk_adulteration_stage, 1);
                loadImages(queue.getResult("water_bath_cover"), "water_bath_cover", 0, 0, "", 0, milk_adulteration_stage, 1);
                createSolutionRect(water_bath_rect, 300, 450, 370, 150, "pointer"); /** Rect for water bath events */  
                /** Initializing the variables */
                initialisationOfVariables(); 
                /** Function call for images used in the apparatus visibility */
                initialisationOfImages();
                /** Function call for the initial value of the controls */
                initialisationOfControls(scope);
                /** Translation of strings using gettext */
                translationLabels();
                /** Rect for testube milk masking */
                milk_adulteration_stage.addChild(mask_milk_rect);
                mask_milk_rect.x = 197;
                mask_milk_rect.y = 555;
                mask_milk_rect.graphics.beginFill("").drawRect(0, 0, 28, 140).command;
                mask_milk_rect.alpha = 0.01;
                scope.$apply();
            }

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() { 
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("Next"), _("Close")];
                scope.heading = _("Detection of Adulteration in Milk");
                scope.variables = _("Variables");
                scope.result = _("Messages");
                scope.copyright = _("copyright");
                scope.adulteration_test_txt = _("Select Adulteration Test:");
                scope.adulteration = _("Table Sugar in Milk");
                clock_label = _("5 minutes at");
                sugar_presence = _("Presence of sugar");
                sugar_absence = _("Absence of sugar");
                benzoic_acid_presence = _("Presence of benzoic acid");
                salicylic_acid_presence = _("Presence of salicylic acid");
                acid_absence = _("Absence of acid");
                starch_presence = _("Presence of starch");
                starch_absence = _("Absence of starch");
                soap_presence = _("Presence of soap");
                soap_absence = _("Absence of soap");
                scope.correct_text = _("Correct Answer!");
                scope.wrong_text = _("Wrong Answer!");
                scope.reset_txt = _("Reset");
                scope.adulteration_array = [{
                    adulteration: _('Table Sugar in Milk'),
                    type: 1,
                    index: 0
                }, {
                    adulteration: _('Acid in Milk'),
                    type: 2,
                    index: 1
                }, {
                    adulteration: _('Starch in Milk'),
                    type: 3,
                    index: 2
                }, {
                    adulteration: _('Soap in Milk'),
                    type: 4,
                    index: 3
                }];
                scope.$apply();
            }
        }
    }
}
/** All the texts loading and added to the natural_convection_stage */
function setText(name, textX, textY, value, color, fontSize, container) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
    _text.name = name;
    _text.text = value;
    _text.color = color;
    container.addChild(_text); /** Adding text to the container */
}
/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container, scale) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    if ( name == "testtube_solution" || name == "blue_solution_anim" || name == "yellow_solution_anim" || name == "violet_solution_anim" ) { //
        _bitmap.mask = mask_milk_rect;
    } else if ( name == "dropper_solution_white" || name == "dropper_solution_yellow" || name == "dropper_solution_brown" ) {
        _bitmap.mask = dropper_solution_mask;
    } else if ( name == "smoke_anim" ) {
        _bitmap.mask = smoke_mask_rect;
    } else if ( name == "resorcinol_anim" || name == "measuring_jar_anim" ) {
        _bitmap.mask = resorcinol_mask_rect;
    }
    if ( name == "measuring_jar" || name == "clock_needle" ) {
        _bitmap.regX = _bitmap.image.width / 2;
        _bitmap.regY = _bitmap.image.height / 2; 
    }
    container.addChild(_bitmap); /** Adding bitmap to the container */
}
/** Function to return child element of stage */
function getChild(child_name) {
    return milk_adulteration_stage.getChildByName(child_name); /** Returns the child element of stage */
} 
/** All variables initialising in this function */
function initialisationOfVariables() {
    hcl_drop_flag = false;
    resorcinol_put_flag = false;
    h2so4_drop_flag = false;
    milk_on_water_bath_flag = false;
    hot_water_drop_flag = false;
    drop_hcl_count = 0;
    put_resorcinol_count = 0;
    water_bath_rect.mouseEnabled = false;
    drop_h2so4_count = 0;
    drop_fecl3_count = 0;
    solution_anim_count = 0;
    drop_iodine_count = 0;
    drop_hot_water_count = 0;
    drop_phenolphthalein_count = 0;
    smoke_anim_count = 0;
    anim_frame = 0; /** Frame used for animation */
    smoke_anim_frame = 0;
    smoke_anim_width = 74.985;
    resorcinol_anim_frame = 0;
    resorcinol_anim_width = 109.97;
    measuring_jar_anim_frame = 0;
    measuring_jar_anim_width = 119.8;
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
    getChild("drop_yellow").visible = false;
    getChild("drop_white").visible = false;
    getChild("drop_brown").visible = false;
    getChild("dropper_solution_yellow").visible = false;
    getChild("dropper_solution_white").visible = false;
    getChild("dropper_solution_brown").visible = false;
    getChild("dropper").visible = false;
    getChild("measuring_jar").visible = false;
    getChild("testtube_red_solution").visible = false;
    getChild("blue_solution_anim").visible = false;
    getChild("violet_solution_anim").visible = false;
    getChild("yellow_solution_anim").visible = false;
    getChild("smoke_anim").visible = false;
    getChild("resorcinol_anim").visible = false;
    getChild("measuring_jar_anim").visible = false;
}
/** Set the initial value of the controls */
function initialisationOfControls(scope) {
    scope.Adulteration = 1;
}
/** Stage updation function */
function updateTimer() {
    milk_adulteration_stage.update();
}
