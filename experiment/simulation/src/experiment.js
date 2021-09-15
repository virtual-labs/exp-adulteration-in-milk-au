/** Function for creating dynamic rectangles */
function createSolutionRect(name, x_val, y_val, width, height, cursor) {
    name.graphics.beginFill("white").drawRect(x_val, y_val, width, height);
    name.alpha = 0.01;
    name.cursor = cursor;
    milk_adulteration_stage.addChild(name);
}
/** Click event of all equipments */
function clickEquipment(scope, dialogs) {
    equipmentsClick(scope, dialogs); /** Click event of all equipments */
}
/** Adulteration dropdown change function */
function adulterationChange(scope) {
	scope.result_radio_button1 = true;
    scope.result_radio_button2 = true;
    /** Display of radio buttons for entering the result */
    if ( scope.Adulteration == 1 ) { /** If the dropdown selected is 'Table sugar in Milk' */
        scope.radio_button1_text = sugar_presence;
        scope.radio_button2_text = sugar_absence;
        scope.result_radio_button3 = false;
    } else if ( scope.Adulteration == 2 ) { /** If the dropdown selected is 'Acid in Milk' */
        scope.radio_button1_text = benzoic_acid_presence;
        scope.radio_button2_text = salicylic_acid_presence;
        scope.radio_button3_text = acid_absence;
        scope.result_radio_button3 = true;
    } else if ( scope.Adulteration == 3 ) { /** Else if the dropdown selected is 'Starch in Milk' */
        water_bath_rect.mouseEnabled = true; /** Enabled water bath rect */
        scope.radio_button1_text = starch_presence;
        scope.radio_button2_text = starch_absence;
        scope.result_radio_button3 = false;
    } else {
        scope.radio_button1_text = soap_presence;
        scope.radio_button2_text = soap_absence;
        scope.result_radio_button3 = false;
    }
}
/** Function for the events of all equipments */
function equipmentsClick(scope, dialogs) {    
    /** FeCl3 solution click event */
    fecl3_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Acid in Milk' & added solution is H2SO4 */
        if ( scope.Adulteration == 2 && h2so4_drop_flag == true ) { 
            dragFeCl3(scope, fecl3_rect); /** Function for drag FeCl3 dropper to near of the milk testtube */
            scope.control_disable = true;                
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** Phenolphthalein solution click event */
    phenolphthalein_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Soap in Milk' & added solution is hot water */
        if ( scope.Adulteration == 4 && hot_water_drop_flag == true ) {
            dropPhenolphthalein(scope, phenolphthalein_rect); /** Function for drag phenolphthalein dropper to near of the milk testtube */
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** HCl solution click event */
    hcl_rect.on("mousedown", function() {  
        /** Checking whether the dropdown selected is 'Table Sugar in Milk' */       
        if ( scope.Adulteration == 1 ) {
            dragHcl(scope, hcl_rect); /** Function for drag HCl measuring jar to near of the milk testtube */               
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** H2SO4 solution click event */
    h2so4_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Acid in Milk' */ 
        if ( scope.Adulteration == 2 ) {                
            dragH2SO4(scope); /** Function for drag H2SO4 dropper to near of the milk testtube */              
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** Iodine solution click event */
    iodine_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Starch in Milk' & check the milk is already placed in incubator */
        if ( scope.Adulteration == 3 && milk_on_water_bath_flag == true ) {
            dragIodine(scope, iodine_rect); /** Function for drag Iodine dropper to near of the milk testtube */
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** Resorcinol spoon click event */
    resorcinol_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Table Sugar in Milk' & the added solution is HCl */         
        if ( scope.Adulteration == 1 && hcl_drop_flag == true ) { 
            resorcinol_rect.mouseEnabled = false;
            getChild("resorcinol_in_spoon").cursor = "move"; /** Spoon cursor set as move */
            dragResorcinol(scope); /** Function for drag resorcinol spoon to near of the milk testtube */
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** Hot water solution click event */
    hot_water_rect.on("mousedown", function() {
        /** Checking whether the dropdown selected is 'Soap in Milk' */  
        if ( scope.Adulteration == 4 ) {
            dragHotWater(scope, hot_water_rect); /** Function for drag measuring jar with water to the near of the milk testtube */               
            scope.control_disable = true;
            scope.$apply();
        } else {
            dialogs.error(); /** Error alert */
            scope.$apply();
        }
    });
    /** Water bath click event */
    water_bath_rect.on("mousedown", function() {
        solutionWaterBath(scope); /** Function for the milk testtube move to the water bath */
        scope.control_disable = true;
        water_bath_rect.mouseEnabled = false;
        scope.$apply();
    });
}
/** Drag HCl measuring jar to near of the milk testtube */ 
function dragHcl(scope) {    
    dragMeasuringJar(scope, hcl_rect, 220, 90, drop_hcl_count, drop_hcl_timer); /** Drag measuring jar to near of the milk testtube */ 
}
/** Drag resorcinol spoon to near of the milk testtube */
function dragResorcinol(scope) {
    resorcinol_put_flag = true; /** Resorcinol flag set as true */    
    getChild("resorcinol_in_spoon").on("mousedown", function(evt) { /** Resorcinol spoon mouse down function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
    });
    getChild("resorcinol_in_spoon").on("pressmove", function(evt) { /** Resorcinol spoon press move function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        milk_beaker_current_x = evt.stageX; /** Assigning the current x and y value to a variable */
        milk_beaker_current_y = evt.stageY;
    });
    getChild("resorcinol_in_spoon").on("pressup", function(event) { /** Resorcinol spoon press up function */
        /** Hit function of resorcinol spoon with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(milk_beaker_current_x, milk_beaker_current_y);
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) {
            /** Resorcinol spoon rotation and putting resorcinol powder into milk animation function in a timer */
            put_resorcinol_timer = setInterval(function() { 
                put_resorcinol_count++; /** Resorcinol count increment */
                putResorcinol(scope, put_resorcinol_count); /** Function for putting resorcinol in to milk testtube animation */
                if ( put_resorcinol_count == 5 ) {
                    var increasing_milk_tween = createjs.Tween.get(mask_milk_rect).to({
                        y: mask_milk_rect.y-8
                    }, 1500); /** Increasing milk tween */
                }
            }, 150);            
        } else {
            getChild("resorcinol_in_spoon").x = 582;
            getChild("resorcinol_in_spoon").y = 35;
        }
    });
}
/** Putting resorcinol in to milk testtube animation function */
function putResorcinol(scope, put_resorcinol_count) {
    getChild("resorcinol_in_spoon").visible = false; /** Resorcinol spoon visibility set as false */   
    resorcinol_anim_object = getChild("resorcinol_anim");
    resorcinol_anim_object.visible = true;
    resorcinol_anim_frame++; /** Frame increment */
    if (resorcinol_anim_frame <= 14) {
        resorcinol_anim_object.x = resorcinol_anim_object.x - resorcinol_anim_width; /** Changing of animation object x position */
    } else {
        clearInterval(put_resorcinol_timer); /** Clear the resorcinol timer */
        resorcinol_anim_object.visible = false;
        solutionWaterBath(scope); /** Function for move the solution into water bath */
    }
}
/** Move the solution into the top place of water bath */
function solutionWaterBath(scope) {
    setText("degree_text", 570, 495, "100℃", "red", 1.1, milk_adulteration_stage); /** Label for degree */
    var water_bath_open_tween = createjs.Tween.get(getChild("water_bath_closer")).to({
        x:getChild("water_bath_closer").x+34, y: getChild("water_bath_closer").y-18
    }, 1500); /** Water bath lid open tween */
    var testtube_solution_move_tween = createjs.Tween.get(getChild("testtube_solution")).to({
        x: getChild("testtube_solution").x+200, y: getChild("testtube_solution").y-200
    }, 2000); /** Testtube solution move to the top place of water bath */
    var testtube_mask_move_tween = createjs.Tween.get(mask_milk_rect).to({
        x: mask_milk_rect.x+200, y: mask_milk_rect.y-200
    }, 2000); /** Testtube mask move to the top place of water bath */
    /** Testtube move to the top place of water bath and after that testtubePutInWaterBath function is calling */
    var testtube_move_tween = createjs.Tween.get(getChild("testtube")).to({
        x: getChild("testtube").x+200, y: getChild("testtube").y-200
    }, 2000).call(function() { testtubePutInWaterBath(scope)});
}
/** Move the solution into water bath */
function testtubePutInWaterBath(scope) {
    /** Testtube move to water bath and after that displayClock function is calling */
    var testtube_in_waterbath_tween = createjs.Tween.get(getChild("testtube")).to({
        y: getChild("testtube").y+155
    }, 2000).call(function() { displayClock(scope)});
    var testtube_solution_in_waterbath_tween = createjs.Tween.get(getChild("testtube_solution")).to({
        y: getChild("testtube_solution").y+160
    }, 2000); /** Testtube solution move to the water bath */
    var testtube_mask_in_waterbath_tween = createjs.Tween.get(mask_milk_rect).to({
        y: mask_milk_rect.y+160
    }, 2000); /** Testtube mask move to the water bath */
}
/** Function for display clock and time */
function displayClock(scope) {
    /** Loading of clock and clock needle images here */
    loadImages(queue.getResult("clock"), "clock", 260, 170, "", 0, milk_adulteration_stage, 0.9);
    loadImages(queue.getResult("clock_needle"), "clock_needle", 338, 250, "", 0, milk_adulteration_stage, 0.9);
    setText("clock_text", 260, 340, clock_label+"100℃", "white", 1.1, milk_adulteration_stage); /** Label for clock */
    /** If the dropdown selected is 'Table Sugar in Milk' the sugarInMilk function is calling after rotation of clock needle 
    else the dropdown selected is 'Starch in Milk' the starchInMilk function is calling after rotation of clock needle*/
    if ( scope.Adulteration == 1 ) {
        var needle_rotation_tween = createjs.Tween.get(getChild("clock_needle")).to({
            rotation: 427
        }, 3000).call(function() { sugarInMilk(scope)});
    } else {
        var needle_rotation_tween = createjs.Tween.get(getChild("clock_needle")).to({
            rotation: 427
        }, 3000).call(function() { starchInMilk(scope)}); 
    }    
}
/** Animation function for display the smoke after */
function smokeAnimation() {
    smoke_anim_object = getChild("smoke_anim");
    smoke_anim_object.visible = true;
    smoke_anim_frame++; /** Frame increment */
    if ( smoke_anim_frame <= 19 ) {
        smoke_anim_object.x = smoke_anim_object.x - smoke_anim_width; /** Changing of animation object x position */
    } else {
        smoke_anim_frame = 0; /** Resetting the animation frame */        
        smoke_anim_object.x = 370; /** Resetting the position of water animation object */
    }
}
/** Function for the testing of sugar in milk */
function sugarInMilk(scope) {
    /** Remove the clock, clock needle and clock text here */
    milk_adulteration_stage.removeChild(getChild("clock"));
    milk_adulteration_stage.removeChild(getChild("clock_needle"));
    getChild("clock_text").visible = false;
    /** Array for the random color display of solution */
    color_solution_array = ["testtube_red_solution", "testtube_solution"];
    random_color = Math.floor(Math.random() * color_solution_array.length);
    getChild(color_solution_array[random_color]).visible = true;
    var testtube_in_waterbath_tween = createjs.Tween.get(getChild("testtube")).to({
        y: getChild("testtube").y-155
    }, 2000); /** Testtube movement from water bath */
    var testtube_solution_in_waterbath_tween = createjs.Tween.get(getChild(color_solution_array[random_color])).to({
        y: getChild("testtube_solution").y-162
    }, 2000); /** Testtube solution movement from water bath */
    if ( random_color == 1 ) { /** If the random color white */
        var testtube_mask_in_waterbath_tween = createjs.Tween.get(mask_milk_rect).to({
            y: mask_milk_rect.y-170
        }, 2000); /** Testtube mask movement from the water bath */
    }    
    /** Smoke animation timer */    
    smoke_anim_timer = setInterval(function() { 
        smoke_anim_count++;
        smokeAnimation(scope, smoke_anim_count); /** Smoke animation function */
        if ( smoke_anim_count == 19 ) {
            smoke_anim_count = 0;
        }
    }, 150);    
    milk_on_water_bath_flag = true;
    scope.radio_disable = false;
    scope.$apply();
}
/** Function for the testing of starch in milk */
function starchInMilk(scope) {
    /** Remove the clock, clock needle and clock text here */
    milk_adulteration_stage.removeChild(getChild("clock"));
    milk_adulteration_stage.removeChild(getChild("clock_needle"));
    getChild("clock_text").visible = false;
    var testtube_in_waterbath_tween = createjs.Tween.get(getChild("testtube")).to({
        y: getChild("testtube").y-155
    }, 2000); /** Testtube move to the top place of water bath */
    var testtube_solution_tween = createjs.Tween.get(getChild("testtube_solution")).to({
        y: getChild("testtube_solution").y-162
    }, 2000); /** Testtube solution move to the top place of water bath */
    var testtube_mask_in_waterbath_tween = createjs.Tween.get(mask_milk_rect).to({
        y: mask_milk_rect.y-160
    }, 2000); /** Testtube mask move to the top place of water bath */
    /** Smoke animation timer */
    smoke_anim_timer = setInterval(function() { 
        smoke_anim_count++;
        smokeAnimation(scope, smoke_anim_count); /** Smoke animation function */
        if ( smoke_anim_count == 20 ) {
            testtubeReturnMovement(); /** Testtube return to the stand function */
            clearInterval(smoke_anim_timer);
            getChild("smoke_anim").visible = false;
        }
    }, 150);
}
/** Testtube return movement */
function testtubeReturnMovement() {
    var testtube_move_tween = createjs.Tween.get(getChild("testtube")).to({
        x: getChild("testtube").x-200, y: getChild("testtube").y+100
    }, 2000); /** Testtube movement tween */
    var testtube_solution_tween = createjs.Tween.get(getChild("testtube_solution")).to({
        x: getChild("testtube_solution").x-200, y: getChild("testtube_solution").y+100
    }, 2000); /** Testtube solution movement tween */
    var testtube_mask_move_tween = createjs.Tween.get(mask_milk_rect).to({
        x: mask_milk_rect.x-200, y: mask_milk_rect.y+100
    }, 2000).call(testtubeReturnToStand); /** Testtube mask movement tween after calling testtubeReturnToStand function */
}
/** Testtube return to the stand */
function testtubeReturnToStand() {
    var testtube_move_tween = createjs.Tween.get(getChild("testtube")).to({
        y: 442
    }, 2000); /** Testtube return tween */
    var testtube_solution_tween = createjs.Tween.get(getChild("testtube_solution")).to({
        y: 470
    }, 2000); /** Testtube solution return tween */
    var testtube_mask_move_tween = createjs.Tween.get(mask_milk_rect).to({
        y: 555
    }, 2000); /** Testtube mask return tween */
    milk_on_water_bath_flag = true;
}
/** Drag H2SO4 to the milk */
function dragH2SO4(scope) {
    dropperMousedownPressmove("dropper_solution_white", 347, 45, 350, 75); /** Function for dropper mousedown and pressmove events */
    h2so4_rect.mouseEnabled = false;
    getChild("dropper").on("pressup", function(event) { /** Milk beaker press up function */
        /** Hit function of dropper with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(milk_beaker_current_x, milk_beaker_current_y);
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) {
            /** Dropping h2so4 into milk animation function in a timer */
            drop_h2so4_timer = setInterval(function() { 
                drop_h2so4_count++;
                dropH2SO4(scope, drop_h2so4_count); /** Dropping h2so4 animation function */   
                if ( drop_h2so4_count == 5 ) {
                    var increasing_milk_tween = createjs.Tween.get(mask_milk_rect).to({
                        y: mask_milk_rect.y-8
                    }, 5000); /** Increasing milk tween */
                }  
                if ( dropper_solution_mask.y >= 434 ) {
                    clearInterval(drop_h2so4_timer);
                    h2so4_drop_flag = true;
                    getChild("dropper").visible = false;
                    getChild("dropper_solution_white").visible = false;
                    getChild("drop_white").visible = false; 
                }           
            }, 100);
        } else {
            getChild("dropper").x = 347;
            getChild("dropper").y = 45;
            getChild("dropper_solution_white").x = getChild("dropper").x+3;
            getChild("dropper_solution_white").y = getChild("dropper").y+30;
            dropper_solution_mask.x = getChild("dropper").x+3;
            dropper_solution_mask.y = getChild("dropper").y+45;
        }
    });
}
/** Drop h2so4 into the milk testtube */
function dropH2SO4(scope, drop_h2so4_count) {
    dropSolution(scope, drop_h2so4_count, "dropper_solution_white", "drop_white"); /** Drop solution from dropper to milk testtube */
}
/** Drag and drop fecl3 to the testtube */
function dragFeCl3(scope, fecl3_rect) {
    /** Drag and drop solution to the testtube */
    dragDropper(scope, fecl3_rect, "dropper_solution_yellow", "drop_yellow", 85, 165, 88, 195, drop_fecl3_timer, drop_fecl3_count);
}
/** Drag and drop iodine to the testtube */
function dragIodine(scope) {
    /** Drag and drop solution to the testtube */
    dragDropper(scope, iodine_rect, "dropper_solution_brown", "drop_brown", 470, 45, 473, 75, drop_iodine_timer, drop_iodine_count);
}
/** Drag and pour hot water to the testtube */
function dragHotWater(scope, hot_water_rect) {
    /** Drag and pour solution to the testtube */
    dragMeasuringJar(scope, hot_water_rect, 610, 220, drop_hot_water_count, drop_hot_water_timer);
}
/** Drag and drop phenolphthalein to the testtube */
function dropPhenolphthalein(scope, phenolphthalein_rect) {
    /** Drag and drop solution to the testtube */
    dragDropper(scope, phenolphthalein_rect, "dropper_solution_white", "drop_white", 80, 45, 83, 75, drop_phenolphthalein_timer, drop_phenolphthalein_count);
}
/** Drag function of measuring jar */
function dragMeasuringJar(scope, rect, x_val, y_val, count, timer) {
    getChild("measuring_jar").visible = true; /** Measuring jar visibility set as true */
    rect.mouseEnabled = false;
    getChild("measuring_jar").x = x_val;
    getChild("measuring_jar").y = y_val;
    getChild("measuring_jar").on("mousedown", function(evt) { /** Measuring jar mouse down function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
    });
    getChild("measuring_jar").on("pressmove", function(evt) { /** Measuring jar press move function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        milk_beaker_current_x = evt.stageX; /** Assigning the current x and y value to a variable */
        milk_beaker_current_y = evt.stageY;
    });
    getChild("measuring_jar").on("pressup", function(event) { /** Measuring jar press up function */
        /** Hit function of measuring jar with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(milk_beaker_current_x, milk_beaker_current_y);
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) {
            if ( scope.Adulteration == 1 ) { /** If dropdown selected is 'Table Sugar in Milk' hcl_drop_flag set true */
                hcl_drop_flag = true;
            } else { /** Else hot_water_drop_flag set true */
                hot_water_drop_flag = true;
            }
            /** Measuring jar rotation and dropping solution into milk animation function in a timer */
            timer = setInterval(function() { 
                count++; /** Measuring jar count increment */
                dropMeasuringJarLiquid(scope, count, timer); /** Dropping measuring jar solution animation function */
                if ( count == 5 ) {
                    var increasing_milk_tween = createjs.Tween.get(mask_milk_rect).to({
                        y: mask_milk_rect.y-10
                    }, 1500); /** Increasing milk tween */
                }
            }, 150);            
        } else {
            getChild("measuring_jar").x = x_val;
            getChild("measuring_jar").y = y_val;
        }
    });
}
/** Dropping the mesuring jar liquid */
function dropMeasuringJarLiquid (scope, count, timer) {
    getChild("measuring_jar").visible = false;
    measuring_jar_anim_object = getChild("measuring_jar_anim");
    measuring_jar_anim_object.visible = true;
    measuring_jar_anim_frame++; /** Frame increment */
    if ( measuring_jar_anim_frame <= 19 ) {
        measuring_jar_anim_object.x = measuring_jar_anim_object.x - measuring_jar_anim_width; /** Changing of animation object x position */
    } else {
        measuring_jar_anim_object.visible = false;
        clearInterval(timer);
    }   
}
/** Dynamic answer checking function */
function checkingResult(scope, selected_radio) {
    if ( scope.temp.data == selected_radio ) { /** If the selected radio is first one */
        scope.correct_ans_txt = true;
        document.getElementById("correct_icon").style.display = "block";
        scope.wrong_ans_txt = false;
        document.getElementById("wrong_icon").style.display = "none";
    } else {
        scope.wrong_ans_txt = true;
        document.getElementById("wrong_icon").style.display = "block";
        scope.correct_ans_txt = false;
        document.getElementById("correct_icon").style.display = "none";
    }
}
/** Function of the radio button click event */
function resultCheck(scope) {
    if ( scope.radio_disable == false ) {
        if ( scope.Adulteration == 2 ) { /** If the dropdown selected is 'Acid in Milk' */
            if ( random_color == 0 ) { /** If the liquid color is yellow */
                checkingResult(scope, 1);
            } else if ( random_color == 1 ) { /** If the liquid color is violet */
                checkingResult(scope, 2);
            } else if ( random_color == 2 ) { /** If the liquid is color less */
                checkingResult(scope, 3);
            }   
        } else {
            if ( random_color == 0 ) { /** If the liquid got color */
                checkingResult(scope, 1);
            } else { /** If the liquid is color less */
                checkingResult(scope, 2);
            }  
        }
    }    
}
/** Dropper mousedown and pressmove events function */
function dropperMousedownPressmove(dropper_solution, dropper_x, dropper_y, soln_x, soln_y) {
    getChild("dropper").visible = true;
    getChild(dropper_solution).visible = true;
    getChild("dropper").x = dropper_x;
    getChild("dropper").y = dropper_y;
    getChild(dropper_solution).x = soln_x;
    getChild(dropper_solution).y = soln_y;
    dropper_solution_mask.x = getChild("dropper").x+3;
    dropper_solution_mask.y = getChild("dropper").y+45;
    getChild("dropper").on("mousedown", function(evt) { /** Dropper mouse down function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
    });
    getChild("dropper").on("pressmove", function(evt) { /** Dropper press move function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        getChild(dropper_solution).x = getChild("dropper").x+3;
        getChild(dropper_solution).y = getChild("dropper").y+30;
        dropper_solution_mask.x = getChild("dropper").x+3;
        dropper_solution_mask.y = getChild("dropper").y+45;
        milk_beaker_current_x = evt.stageX; /** Assigning the current x and y value to a variable */
        milk_beaker_current_y = evt.stageY;
    });   
}
/** Drag function of dropper */
function dragDropper(scope, rect, dropper_solution, drop, dropper_x, dropper_y, soln_x, soln_y, timer, count) {
    rect.mouseEnabled = false;
    dropperMousedownPressmove(dropper_solution, dropper_x, dropper_y, soln_x, soln_y); /** Function for dropper mousedown and pressmove events */
    getChild("dropper").on("pressup", function(event) { /** Dropper press up function */
        /** Hit function of dropper with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(milk_beaker_current_x, milk_beaker_current_y);
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) {
            /** Dropping solution into milk animation function in a timer */
            timer = setInterval(function() { 
                count++;
                dropSolution(scope, count, dropper_solution, drop); /** Dropping solution animation function */   
                if ( count == 5 ) {
                    var increasing_milk_tween = createjs.Tween.get(mask_milk_rect).to({
                        y: mask_milk_rect.y-8
                    }, 5000); /** Increasing milk tween */
                } 
                if ( dropper_solution_mask.y >= 434 ) {
                    clearInterval(timer);
                    getChild("dropper").visible = false;
                    getChild(dropper_solution).visible = false;
                    getChild("drop_yellow").visible = false; 
                    getChild("drop_white").visible = false; 
                    getChild("drop_brown").visible = false;

                    if ( dropper_solution == "dropper_solution_yellow" ) { /** If the dropper solution is yellow */
                        color_solution_anim_array = ["yellow_solution_anim", "violet_solution_anim", "color_less"];
                    } else if ( dropper_solution == "dropper_solution_brown" ) { /** Else if the dropper solution is brown */
                        color_solution_anim_array = ["blue_solution_anim", "color_less"];
                    } else {
                        color_solution_anim_array = ["violet_solution_anim", "color_less"];
                    }      
                    /** Random element from the array color_solution_anim_array in a variable */             
                    random_color = Math.floor(Math.random() * color_solution_anim_array.length);
                    /** Solution animation function in a timer */
                    solution_anim_timer = setInterval(function() { 
                        solution_anim_count++;      
                        /** Dropping solution animation function */
                        colorSolutionAnimation(scope, solution_anim_count, color_solution_anim_array[random_color]); 
                    }, 200);
                } else {
                    getChild("dropper").visible = true
                }           
            }, 100);            
        } else {
            getChild("dropper").x = dropper_x;
            getChild("dropper").y = dropper_y;
            getChild(dropper_solution).x = getChild("dropper").x+3;
            getChild(dropper_solution).y = getChild("dropper").y+30;
            dropper_solution_mask.x = getChild("dropper").x+3;
            dropper_solution_mask.y = getChild("dropper").y+45;
        }
    });
}
/** Dropping solution to the testube milk */
function dropSolution(scope, count, dropper_solution, drop) {
    /** Set position and visibility of testtube, corresponding solution and the corresponding drop */
    getChild("dropper").x = 201;
    getChild("dropper").y = 345;
    getChild(dropper_solution).x = getChild("dropper").x+3;
    getChild(dropper_solution).y = getChild("dropper").y+30;
    dropper_solution_mask.x = getChild("dropper").x+3;
    dropper_solution_mask.y = getChild("dropper").y+45;
    getChild(drop).visible = true;
    dropper_solution_mask.y += count;
    if ( getChild(drop).y == 427 ) {
        var yellow_drop_tween = createjs.Tween.get(getChild(drop)).to({
            y: 550
        }, 500); /** Solution drop falling tween */
    } else if ( getChild(drop).y == 550 ) {
        getChild(drop).y = 427;
    } 
}
/** Solution dropping animation function */
function colorSolutionAnimation(scope, solution_anim_count, random_color) {
    scope.radio_disable = false;
    anim_width = 26.991; /** Animation width */
    anim_object = getChild(random_color); /** Animation frames take as an object */
    if ( random_color == "color_less" ) {
        getChild("testtube_solution").visible = true;
    } else {
        getChild(random_color).visible = true;
        anim_frame++; /** Frame increment */
        if (anim_frame < 10) {
            anim_object.x = anim_object.x - anim_width; /** Changing of animation object x position */
        } else {            
            clearInterval(solution_anim_timer);
        }
    }
    scope.$apply();
}
/** Reset the experiment in the reset button event */
function resetExperiment() {
    window.location.reload();
}