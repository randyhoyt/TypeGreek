/* ********************************************************************************************
   * typegreek_convertStr (object, event)
   * ******************************************************************************************** */

function typegreek_convertStr(control, event) {
	
	var startString = "";
	var workingString = "";
	var finishString = "";
	var finishCursorStart = 0;
	var finishCursorEnd = 0;
	var currentCursor = 0;	

    var key;
    if (window.event) {
    // for IE
        key = event.keyCode; 
    } else if (event.which) {
    // for Mozilla
        key = event.which; 
    }
    
    if ( (key != 37) && (key != 38) && (key != 39) && (key != 40)  ) {
        // --------------- get cursor info and starting value
        startString = control.value;
        while (startString.indexOf ("(#$-undo-not-available-$#)", "") > -1) {
            startString = startString.replace("(#$-undo-not-available-$#)", "");
        }
        finishString = "";
        var scrollTop = control.scrollTop;  
    
        //IE support
        if (document.selection) {
            sel = document.selection.createRange();
            textSelected = sel.text;
            key = "(#$-undo-not-available-$#)";
            lenSelected = sel.text.length;
            sel.text = key;
            finishCursorStart = control.value.indexOf(key);
            finishCursorEnd = finishCursorStart + lenSelected;
        //MOZILLA/NETSCAPE support
        } else if (control.selectionStart || control.selectionStart == '0') {
            finishCursorStart = control.selectionStart;
            finishCursorEnd = control.selectionEnd;
        }    

        greek = new Array(); greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;
        // --------------- break apart the greek characters in the starting value
        greek = typegreek_breakApartGreekCharacters(greek,control); 
        // --------------- combine the greek characters in the starting value
        greek = typegreek_combineGreekCharacters(greek,control);
        startString = greek[0]; workingString = greek[1]; finishString = greek[2]; finishCursorStart = greek[3]; finishCursorEnd = greek[4]; currentCursor = greek[5];
        
        // --------------- insert finishing value 
        control.value = finishString;
        //IE support
        if (document.selection) {
            stringBeforeCursor = (finishString.substring(0, finishCursorStart));
            numberOfHardReturnsBefore = 0     
            while (stringBeforeCursor.indexOf("\r\n") > -1) {
                numberOfHardReturnsBefore = numberOfHardReturnsBefore + 1;
                stringBeforeCursor = stringBeforeCursor.replace("\r\n", "#");
            }
            sel.moveStart("character", finishCursorStart - numberOfHardReturnsBefore);

            stringAfterCursor = (finishString.substring(finishCursorEnd, finishString.length));
            numberOfHardReturnsAfter = 0;
            while (stringAfterCursor.indexOf("\r\n") > -1) {
                numberOfHardReturnsAfter = numberOfHardReturnsAfter + 1;
                stringAfterCursor = stringAfterCursor.replace("\r\n", "#");
            }
            //if (stringAfterCursor.indexOf("#") == 0 && finishCursorStart != finishCursorEnd) {numberOfHardReturnsAfter = numberOfHardReturnsAfter + 1;};
            sel.moveEnd("character", ( finishCursorEnd - (finishString.length) + numberOfHardReturnsAfter) );
    
            sel.select();
        
        //MOZILLA/NETSCAPE support
        } else if (control.selectionStart || control.selectionStart == '0') {
            control.selectionStart = finishCursorStart;
            control.selectionEnd = finishCursorEnd;
            control.scrollTop = scrollTop;
        }
    }
return;
}


/* ********************************************************************************************
   * convertCharToggle (object, boolean, event)
   * ******************************************************************************************** */
   
function typegreek_convertCharToggle(control, toggle, event) {

    if (toggle == true) {
        var key;
        if (window.event) {
        // for IE
        key = event.keyCode; 
        } else if (event.which) {
        // for Mozilla
            key = event.which; 
        }
        typeLetter = true;

        if ( event.ctrlKey || event.metaKey ) {
        	return;
        } else {
            if ( key == 38 ) { typegreek_insertAtCursor(control, '`'); typeLetter = false; } // & -> \
            if ( key == 33 ) { typegreek_insertAtCursor(control, 'ͺ'); typeLetter = false; } // ! -> |
            if ( key == 40 ) { typegreek_insertAtCursor(control, '῾'); typeLetter = false; }
            if ( key == 41 ) { typegreek_insertAtCursor(control, '᾿'); typeLetter = false; }
            if ( key == 43 ) { typegreek_insertAtCursor(control, '¨'); typeLetter = false; }
            if ( key == 47 ) { typegreek_insertAtCursor(control, '´'); typeLetter = false; }
            if ( key == 58 ) { typegreek_insertAtCursor(control, '·'); typeLetter = false; }            
            if ( key == 59 ) { typegreek_insertAtCursor(control, '·'); typeLetter = false; }            
            if ( key == 61 ) { typegreek_insertAtCursor(control, '῀'); typeLetter = false; }    
            if ( key == 63 ) { typegreek_insertAtCursor(control, ';'); typeLetter = false; }
            if ( key == 64 ) { typegreek_insertAtCursor(control, '̣'); typeLetter = false; }                    
            if ( key == 65 ) { typegreek_insertAtCursor(control, 'Α'); typeLetter = false; }
            if ( key == 66 ) { typegreek_insertAtCursor(control, 'Β'); typeLetter = false; }    
            if ( key == 67 ) { typegreek_insertAtCursor(control, 'Ξ'); typeLetter = false; }        
            if ( key == 68 ) { typegreek_insertAtCursor(control, 'Δ'); typeLetter = false; }            
            if ( key == 69 ) { typegreek_insertAtCursor(control, 'Ε'); typeLetter = false; }
            if ( key == 70 ) { typegreek_insertAtCursor(control, 'Φ'); typeLetter = false; }            
            if ( key == 71 ) { typegreek_insertAtCursor(control, 'Γ'); typeLetter = false; }                
            if ( key == 72 ) { typegreek_insertAtCursor(control, 'Η'); typeLetter = false; }                    
            if ( key == 73 ) { typegreek_insertAtCursor(control, 'Ι'); typeLetter = false; }        
            if ( key == 74 ) { typegreek_insertAtCursor(control, 'Σ'); typeLetter = false; }            
            if ( key == 75 ) { typegreek_insertAtCursor(control, 'Κ'); typeLetter = false; }                
            if ( key == 76 ) { typegreek_insertAtCursor(control, 'Λ'); typeLetter = false; }                    
            if ( key == 77 ) { typegreek_insertAtCursor(control, 'Μ'); typeLetter = false; }                        
            if ( key == 78 ) { typegreek_insertAtCursor(control, 'Ν'); typeLetter = false; }                            
            if ( key == 79 ) { typegreek_insertAtCursor(control, 'Ο'); typeLetter = false; }    
            if ( key == 80 ) { typegreek_insertAtCursor(control, 'Π'); typeLetter = false; }        
            if ( key == 81 ) { typegreek_insertAtCursor(control, 'Θ'); typeLetter = false; }            
            if ( key == 82 ) { typegreek_insertAtCursor(control, 'Ρ'); typeLetter = false; }    
            if ( key == 83 ) { typegreek_insertAtCursor(control, 'Σ'); typeLetter = false; }        
            if ( key == 84 ) { typegreek_insertAtCursor(control, 'Τ'); typeLetter = false; }            
            if ( key == 85 ) { typegreek_insertAtCursor(control, 'Υ'); typeLetter = false; }
            if ( key == 86 ) { typegreek_insertAtCursor(control, 'Ϝ'); typeLetter = false; }    
            if ( key == 87 ) { typegreek_insertAtCursor(control, 'Ω'); typeLetter = false; }        
            if ( key == 88 ) { typegreek_insertAtCursor(control, 'Χ'); typeLetter = false; }            
            if ( key == 89 ) { typegreek_insertAtCursor(control, 'Ψ'); typeLetter = false; }    
            if ( key == 90 ) { typegreek_insertAtCursor(control, 'Ζ'); typeLetter = false; }        
            if ( key == 92 ) { typegreek_insertAtCursor(control, '`'); typeLetter = false; }
            if ( key == 97 ) { typegreek_insertAtCursor(control, 'α'); typeLetter = false; }
            if ( key == 98 ) { typegreek_insertAtCursor(control, 'β'); typeLetter = false; }    
            if ( key == 99 ) { typegreek_insertAtCursor(control, 'ξ'); typeLetter = false; }
            if ( key == 100 ) { typegreek_insertAtCursor(control, 'δ'); typeLetter = false; }            
            if ( key == 101 ) { typegreek_insertAtCursor(control, 'ε'); typeLetter = false; }        
            if ( key == 102 ) { typegreek_insertAtCursor(control, 'φ'); typeLetter = false; }            
            if ( key == 103 ) { typegreek_insertAtCursor(control, 'γ'); typeLetter = false; }                
            if ( key == 104 ) { typegreek_insertAtCursor(control, 'η'); typeLetter = false; }                    
            if ( key == 105 ) { typegreek_insertAtCursor(control, 'ι'); typeLetter = false; }            
            if ( key == 106 ) { typegreek_insertAtCursor(control, 'ς'); typeLetter = false; }
            if ( key == 107 ) { typegreek_insertAtCursor(control, 'κ'); typeLetter = false; }    
            if ( key == 108 ) { typegreek_insertAtCursor(control, 'λ'); typeLetter = false; }        
            if ( key == 109 ) { typegreek_insertAtCursor(control, 'μ'); typeLetter = false; }            
            if ( key == 110 ) { typegreek_insertAtCursor(control, 'ν'); typeLetter = false; }                
            if ( key == 111 ) { typegreek_insertAtCursor(control, 'ο'); typeLetter = false; }            
            if ( key == 112 ) { typegreek_insertAtCursor(control, 'π'); typeLetter = false; }                
            if ( key == 113 ) { typegreek_insertAtCursor(control, 'θ'); typeLetter = false; }                        
            if ( key == 114 ) { typegreek_insertAtCursor(control, 'ρ'); typeLetter = false; }                    
            if ( key == 115 ) { typegreek_insertAtCursor(control, 'σ'); typeLetter = false; }    
            if ( key == 116 ) { typegreek_insertAtCursor(control, 'τ'); typeLetter = false; }        
            if ( key == 117 ) { typegreek_insertAtCursor(control, 'υ'); typeLetter = false;}
            if ( key == 118 ) { typegreek_insertAtCursor(control, 'ϝ'); typeLetter = false;}    
            if ( key == 119 ) { typegreek_insertAtCursor(control, 'ω'); typeLetter = false;}        
            if ( key == 120 ) { typegreek_insertAtCursor(control, 'χ'); typeLetter = false; }
            if ( key == 121 ) { typegreek_insertAtCursor(control, 'ψ'); typeLetter = false; }    
            if ( key == 122 ) { typegreek_insertAtCursor(control, 'ζ'); typeLetter = false; }        
            if ( key == 124 ) { typegreek_insertAtCursor(control, 'ͺ'); typeLetter = false; }
            return typeLetter;
        }
    }
}


/* ********************************************************************************************
   * typegreek_insertAtCursor (object)
   * ******************************************************************************************** */
   
function typegreek_insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }

  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    var cursorPos = endPos;
    var scrollTop = myField.scrollTop;    

    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    cursorPos = startPos + myValue.length;

    myField.focus();
    myField.selectionStart = cursorPos;
    myField.selectionEnd = cursorPos;
    myField.scrollTop = scrollTop;
    
  } else {
    myField.value += myValue;
  }
}


/* ********************************************************************************************
   * typegreek_combineGreekCharacters (object)
   * ******************************************************************************************** */
   
function typegreek_breakApartGreekCharacters(greek,control) {
	
    var startString = greek[0]; var workingString = greek[1]; var finishString = greek[2]; var finishCursorStart = greek[3]; var finishCursorEnd = greek[4]; var currentCursor = greek[5];	

    currentCursor = 0;
    startString = startString.replace(/`/,"`");
    while (startString != "") {

        workingString = "";
        
        greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;        
        greek = typegreek_removeOne(greek);
        startString = greek[0]; workingString = greek[1]; finishString = greek[2]; finishCursorStart = greek[3]; finishCursorEnd = greek[4]; currentCursor = greek[5];        
        
        if ( workingString == "ς" ) { workingString = "σ"; }
        if ( workingString == "ά" ) { workingString = "α´"; }
        if ( workingString == "ἁ" ) { workingString = "α῾"; }
        if ( workingString == "ἀ" ) { workingString = "α᾿"; }
        if ( workingString == "ᾶ" ) { workingString = "α῀"; }
        if ( workingString == "ᾳ" ) { workingString = "αͺ"; }
        if ( workingString == "ἄ" ) { workingString = "α᾿´"; }
        if ( workingString == "ᾴ" ) { workingString = "α´ͺ"; }
        if ( workingString == "ᾀ" ) { workingString = "α᾿ͺ"; }
        if ( workingString == "ᾁ" ) { workingString = "α῾ͺ"; }
        if ( workingString == "ᾷ" ) { workingString = "α῀ͺ"; }
        if ( workingString == "ᾄ" ) { workingString = "α᾿´ͺ"; }
        if ( workingString == "ᾂ" ) { workingString = "α᾿`ͺ"; }
        if ( workingString == "ἂ" ) { workingString = "α᾿`"; }
        if ( workingString == "ᾃ" ) { workingString = "α῾`ͺ"; }
        if ( workingString == "ἃ" ) { workingString = "α῾`"; }
        if ( workingString == "ᾲ" ) { workingString = "α`ͺ"; }
        if ( workingString == "ὰ" ) { workingString = "α`"; }
        if ( workingString == "ᾅ" ) { workingString = "α῾´ͺ"; }
        if ( workingString == "ἅ" ) { workingString = "α῾´"; }
        if ( workingString == "ἇ" ) { workingString = "α῾῀"; }
        if ( workingString == "ᾇ" ) { workingString = "α῾῀ͺ"; }
        if ( workingString == "ᾆ" ) { workingString = "α᾿῀ͺ"; }
        if ( workingString == "ἆ" ) { workingString = "α᾿῀"; }
        if ( workingString == "ᾼ" ) { workingString = "Αͺ"; }
        if ( workingString == "Ἁ" ) { workingString = "Α῾"; }
        if ( workingString == "ᾉ" ) { workingString = "Α῾ͺ"; }
        if ( workingString == "Ἀ" ) { workingString = "Α᾿"; }
        if ( workingString == "ᾈ" ) { workingString = "Α᾿ͺ"; }
        if ( workingString == "ᾏ" ) { workingString = "Α῾῀ͺ"; }
        if ( workingString == "Ἇ" ) { workingString = "Α῾῀"; }
        if ( workingString == "ᾎ" ) { workingString = "Α᾿῀ͺ"; }
        if ( workingString == "Ἆ" ) { workingString = "Α᾿῀"; }
        if ( workingString == "Ὰ" ) { workingString = "Α`"; }
        if ( workingString == "Ἃ" ) { workingString = "Α῾`"; }
        if ( workingString == "ᾋ" ) { workingString = "Α῾`ͺ"; }
        if ( workingString == "Ἂ" ) { workingString = "Α᾿`"; }
        if ( workingString == "ᾊ" ) { workingString = "Α᾿`ͺ"; }
        if ( workingString == "Ά" ) { workingString = "Α´"; }
        if ( workingString == "Ἅ" ) { workingString = "Α῾´"; }
        if ( workingString == "ᾍ" ) { workingString = "Α῾´ͺ"; }
        if ( workingString == "Ἄ" ) { workingString = "Α᾿´"; }
        if ( workingString == "ᾌ" ) { workingString = "Α᾿´ͺ"; }   
        
        if ( workingString == "ή" ) { workingString = "η´"; }
        if ( workingString == "ἡ" ) { workingString = "η῾"; }
        if ( workingString == "ἠ" ) { workingString = "η᾿"; }
        if ( workingString == "ῆ" ) { workingString = "η῀"; }
        if ( workingString == "ῃ" ) { workingString = "ηͺ"; }
        if ( workingString == "ἤ" ) { workingString = "η᾿´"; }
        if ( workingString == "ῄ" ) { workingString = "η´ͺ"; }
        if ( workingString == "ᾐ" ) { workingString = "η᾿ͺ"; }
        if ( workingString == "ᾑ" ) { workingString = "η῾ͺ"; }
        if ( workingString == "ῇ" ) { workingString = "η῀ͺ"; }
        if ( workingString == "ᾔ" ) { workingString = "η᾿´ͺ"; }
        if ( workingString == "ᾒ" ) { workingString = "η᾿`ͺ"; }
        if ( workingString == "ἢ" ) { workingString = "η᾿`"; }
        if ( workingString == "ᾓ" ) { workingString = "η῾`ͺ"; }
        if ( workingString == "ἣ" ) { workingString = "η῾`"; }
        if ( workingString == "ῂ" ) { workingString = "η`ͺ"; }
        if ( workingString == "ὴ" ) { workingString = "η`"; }
        if ( workingString == "ᾕ" ) { workingString = "η῾´ͺ"; }
        if ( workingString == "ἥ" ) { workingString = "η῾´"; }
        if ( workingString == "ἧ" ) { workingString = "η῾῀"; }
        if ( workingString == "ᾗ" ) { workingString = "η῾῀ͺ"; }
        if ( workingString == "ᾖ" ) { workingString = "η᾿῀ͺ"; }
        if ( workingString == "ἦ" ) { workingString = "η᾿῀"; }
        if ( workingString == "ῌ" ) { workingString = "Ηͺ"; }
        if ( workingString == "Ἡ" ) { workingString = "Η῾"; }
        if ( workingString == "ᾙ" ) { workingString = "Η῾ͺ"; }
        if ( workingString == "Ἠ" ) { workingString = "Η᾿"; }
        if ( workingString == "ᾘ" ) { workingString = "Η᾿ͺ"; }
        if ( workingString == "ᾟ" ) { workingString = "Η῾῀ͺ"; }
        if ( workingString == "Ἧ" ) { workingString = "Η῾῀"; }
        if ( workingString == "ᾞ" ) { workingString = "Η᾿῀ͺ"; }
        if ( workingString == "Ἦ" ) { workingString = "Η᾿῀"; }
        if ( workingString == "Ὴ" ) { workingString = "Η`"; }
        if ( workingString == "Ἣ" ) { workingString = "Η῾`"; }
        if ( workingString == "ᾛ" ) { workingString = "Η῾`ͺ"; }
        if ( workingString == "Ἢ" ) { workingString = "Η᾿`"; }
        if ( workingString == "ᾚ" ) { workingString = "Η᾿`ͺ"; }
        if ( workingString == "Ή" ) { workingString = "Η´"; }
        if ( workingString == "Ἥ" ) { workingString = "Η῾´"; }
        if ( workingString == "ᾝ" ) { workingString = "Η῾´ͺ"; }
        if ( workingString == "Ἤ" ) { workingString = "Η᾿´"; }
        if ( workingString == "ᾜ" ) { workingString = "Η᾿´ͺ"; } 
        
        if ( workingString == "ώ" ) { workingString = "ω´"; }
        if ( workingString == "ὡ" ) { workingString = "ω῾"; }
        if ( workingString == "ὠ" ) { workingString = "ω᾿"; }
        if ( workingString == "ῶ" ) { workingString = "ω῀"; }
        if ( workingString == "ῳ" ) { workingString = "ωͺ"; }
        if ( workingString == "ὤ" ) { workingString = "ω᾿´"; }
        if ( workingString == "ῴ" ) { workingString = "ω´ͺ"; }
        if ( workingString == "ᾠ" ) { workingString = "ω᾿ͺ"; }
        if ( workingString == "ᾡ" ) { workingString = "ω῾ͺ"; }
        if ( workingString == "ῷ" ) { workingString = "ω῀ͺ"; }
        if ( workingString == "ᾤ" ) { workingString = "ω᾿´ͺ"; }
        if ( workingString == "ᾢ" ) { workingString = "ω᾿`ͺ"; }
        if ( workingString == "ὢ" ) { workingString = "ω᾿`"; }
        if ( workingString == "ᾣ" ) { workingString = "ω῾`ͺ"; }
        if ( workingString == "ὣ" ) { workingString = "ω῾`"; }
        if ( workingString == "ῲ" ) { workingString = "ω`ͺ"; }
        if ( workingString == "ὼ" ) { workingString = "ω`"; }
        if ( workingString == "ᾥ" ) { workingString = "ω῾´ͺ"; }
        if ( workingString == "ὥ" ) { workingString = "ω῾´"; }
        if ( workingString == "ὧ" ) { workingString = "ω῾῀"; }
        if ( workingString == "ᾧ" ) { workingString = "ω῾῀ͺ"; }
        if ( workingString == "ᾦ" ) { workingString = "ω᾿῀ͺ"; }
        if ( workingString == "ὦ" ) { workingString = "ω᾿῀"; }
        if ( workingString == "ῼ" ) { workingString = "Ωͺ"; }
        if ( workingString == "Ὡ" ) { workingString = "Ω῾"; }
        if ( workingString == "ᾩ" ) { workingString = "Ω῾ͺ"; }
        if ( workingString == "Ὠ" ) { workingString = "Ω᾿"; }
        if ( workingString == "ᾨ" ) { workingString = "Ω᾿ͺ"; }
        if ( workingString == "ᾯ" ) { workingString = "Ω῾῀ͺ"; }
        if ( workingString == "Ὧ" ) { workingString = "Ω῾῀"; }
        if ( workingString == "ᾮ" ) { workingString = "Ω᾿῀ͺ"; }
        if ( workingString == "Ὦ" ) { workingString = "Ω᾿῀"; }
        if ( workingString == "Ὼ" ) { workingString = "Ω`"; }
        if ( workingString == "Ὣ" ) { workingString = "Ω῾`"; }
        if ( workingString == "ᾫ" ) { workingString = "Ω῾`ͺ"; }
        if ( workingString == "Ὢ" ) { workingString = "Ω᾿`"; }
        if ( workingString == "ᾪ" ) { workingString = "Ω᾿`ͺ"; }
        if ( workingString == "Ώ" ) { workingString = "Ω´"; }
        if ( workingString == "Ὥ" ) { workingString = "Ω῾´"; }
        if ( workingString == "ᾭ" ) { workingString = "Ω῾´ͺ"; }
        if ( workingString == "Ὤ" ) { workingString = "Ω᾿´"; }
        if ( workingString == "ᾬ" ) { workingString = "Ω᾿´ͺ"; }          

        if ( workingString == "έ" ) { workingString = "ε´"; }
        if ( workingString == "ὲ" ) { workingString = "ε`"; }        
        if ( workingString == "ἐ" ) { workingString = "ε᾿"; }
        if ( workingString == "ἑ" ) { workingString = "ε῾"; }        
        if ( workingString == "ἔ" ) { workingString = "ε᾿´"; }        
        if ( workingString == "ἓ" ) { workingString = "ε῾`"; }
        if ( workingString == "Έ" ) { workingString = "Ε´"; }
        if ( workingString == "Ὲ" ) { workingString = "Ε`"; }        
        if ( workingString == "Ἐ" ) { workingString = "Ε᾿"; }
        if ( workingString == "Ἑ" ) { workingString = "Ε῾"; }        
        if ( workingString == "Ἔ" ) { workingString = "Ε᾿´"; }        
        if ( workingString == "Ἕ" ) { workingString = "Ε῾´"; }  
        
        if ( workingString == "ί" ) { workingString = "ι´"; }
        if ( workingString == "ἰ" ) { workingString = "ι᾿"; }
        if ( workingString == "ῖ" ) { workingString = "ι῀"; }
        if ( workingString == "ἱ" ) { workingString = "ι῾"; }
        if ( workingString == "ἴ" ) { workingString = "ι᾿´"; }
        if ( workingString == "ϊ" ) { workingString = "ι¨"; }
        if ( workingString == "ΐ" ) { workingString = "ι´¨"; }
        if ( workingString == "ἲ" ) { workingString = "ι᾿`"; }
        if ( workingString == "ἳ" ) { workingString = "ι῾`"; }
        if ( workingString == "ῒ" ) { workingString = "ι`¨"; }
        if ( workingString == "ὶ" ) { workingString = "ι`"; }
        if ( workingString == "ἵ" ) { workingString = "ι῾´"; }
        if ( workingString == "ῗ" ) { workingString = "ι῀¨"; }
        if ( workingString == "ἷ" ) { workingString = "ι῾῀"; }
        if ( workingString == "ἶ" ) { workingString = "ι᾿῀"; }
        if ( workingString == "Ϊ" ) { workingString = "Ι¨"; }
        if ( workingString == "Ἱ" ) { workingString = "Ι῾"; }
        if ( workingString == "Ἷ" ) { workingString = "Ι῾῀"; }
        if ( workingString == "Ὶ" ) { workingString = "Ι`"; }
        if ( workingString == "Ἳ" ) { workingString = "Ι῾`"; }
        if ( workingString == "Ί" ) { workingString = "Ι´"; }
        if ( workingString == "Ἵ" ) { workingString = "Ι῾´"; }
        if ( workingString == "Ἰ" ) { workingString = "Ι᾿"; }
        if ( workingString == "Ἶ" ) { workingString = "Ι᾿῀"; }
        if ( workingString == "Ἲ" ) { workingString = "Ι᾿`"; }
        if ( workingString == "Ἴ" ) { workingString = "Ι᾿´"; }        

        if ( workingString == "ό" ) { workingString = "ο´"; }
        if ( workingString == "ὸ" ) { workingString = "ο`"; }        
        if ( workingString == "ὀ" ) { workingString = "ο᾿"; }
        if ( workingString == "ὁ" ) { workingString = "ο῾"; }        
        if ( workingString == "ὃ" ) { workingString = "ο῾`"; }        
        if ( workingString == "ὅ" ) { workingString = "ο῾´"; }
        if ( workingString == "Ό" ) { workingString = "Ο´"; }
        if ( workingString == "Ὸ" ) { workingString = "Ο`"; }        
        if ( workingString == "Ὀ" ) { workingString = "Ο᾿"; }
        if ( workingString == "Ὁ" ) { workingString = "Ο῾"; }        
        if ( workingString == "Ὄ" ) { workingString = "Ο᾿´"; }        
        if ( workingString == "Ὅ" ) { workingString = "Ο῾´"; }

        if ( workingString == "ύ" ) { workingString = "υ´"; }
        if ( workingString == "ὐ" ) { workingString = "υ᾿"; }
        if ( workingString == "ῦ" ) { workingString = "υ῀"; }
        if ( workingString == "ὑ" ) { workingString = "υ῾"; }
        if ( workingString == "ὔ" ) { workingString = "υ᾿´"; }
        if ( workingString == "ϋ" ) { workingString = "υ¨"; }
        if ( workingString == "ΰ" ) { workingString = "υ´¨"; }
        if ( workingString == "ὒ" ) { workingString = "υ᾿`"; }
        if ( workingString == "ὓ" ) { workingString = "υ῾`"; }
        if ( workingString == "ῢ" ) { workingString = "υ`¨"; }
        if ( workingString == "ὺ" ) { workingString = "υ`"; }
        if ( workingString == "ὕ" ) { workingString = "υ῾´"; }
        if ( workingString == "ῧ" ) { workingString = "υ῀¨"; }
        if ( workingString == "ὗ" ) { workingString = "υ῾῀"; }
        if ( workingString == "ὖ" ) { workingString = "υ᾿῀"; }
        if ( workingString == "Ϋ" ) { workingString = "Υ¨"; }
        if ( workingString == "Ὑ" ) { workingString = "Υ῾"; }
        if ( workingString == "Ὗ" ) { workingString = "Υ῾῀"; }
        if ( workingString == "Ὺ" ) { workingString = "Υ`"; }
        if ( workingString == "Ὓ" ) { workingString = "Υ῾`"; }
        if ( workingString == "Ύ" ) { workingString = "Υ´"; }
        if ( workingString == "Ὕ" ) { workingString = "Υ῾´"; }

        if ( workingString == "Ῥ" ) { workingString = "Ρ῾"; }
        if ( workingString == "ῥ" ) { workingString = "ρ῾"; }        

        if ( currentCursor <= finishCursorStart ) { finishCursorStart = finishCursorStart + (workingString.length - 1); }
        if ( currentCursor <= finishCursorEnd ) { finishCursorEnd = finishCursorEnd + (workingString.length - 1); }
        currentCursor = currentCursor + (workingString.length - 1);

        finishString = finishString + workingString;    
    }
    
    greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;    
    return greek;
}


/* ********************************************************************************************
   * typegreek_combineGreekCharacters (object)
   * ******************************************************************************************** */

function typegreek_combineGreekCharacters(greek, control) {
	
    var startString = greek[0]; var workingString = greek[1]; var finishString = greek[2]; var finishCursorStart = greek[3]; var finishCursorEnd = greek[4]; var currentCursor = greek[5];	

    var COMBINABLE = "ΑαΗηΩωΕεΙιΟοΡρΥυ";
    var VOWELS = "ΑαΗηΩωΕεΙιΟοΥυ";
    var CAPITALS = "ΑΗΩΕΙΟΡΥ";
    var LONG_VOWELS = "ΑαΗηΩωΙιΥυ";
    var ROUGH_BREATHING = "ΑαΗηΩωΕεΙιΟοΡρΥυ";
    var SMOOTH_BREATHING = "ΑαΗηΩωΕεΙιΟου";
    var IOTA = "ΑαΗηΩω";
    var DIERESIS = "ΥυΙι";
    var TERMINAL = "\n\r,;. :·;"    	
    
    startString = finishString;
    finishString = "";
    currentCursor = 0;
    var keepGoing = true;

    while (startString != "") {

        keepGoing = true;
        workingString = "";
        
        greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;                
        greek = typegreek_removeOne(greek);
        startString = greek[0]; workingString = greek[1]; finishString = greek[2]; finishCursorStart = greek[3]; finishCursorEnd = greek[4]; currentCursor = greek[5];
        
        if (startString != "") {        
        // there's at least one more character in the string
        
            if (COMBINABLE.indexOf(workingString) > -1 ) {
            // the current character could be combined with other characters

                while ( (keepGoing == true) && (startString != "") ) {

                    if ( (startString.charAt(0) == "´") || (startString.charAt(0) == "`") ) {
                    // the next character is / or \

                        if ( (VOWELS.indexOf(workingString.charAt(0)) > -1) && (workingString.indexOf('´') == -1)  && (workingString.indexOf('`') == -1) && (workingString.indexOf('῀') == -1) ) {
                        // the current string starts with a vowel and it does not have any of the three accents (/, \, or =)

                            if ( (CAPITALS.indexOf(workingString.charAt(0)) > -1) ) {
                            // the current string starts with a capital letter

                                if ( (DIERESIS.indexOf(workingString.charAt(0)) > -1) ) {
                                // the current string starts with a letter that receives a dieresis
	  
                                    if (workingString.indexOf('¨') > -1) {
                                    // the current string contains a dieresis
                                        keepGoing = false;
	                                } else {
                                    // the current string does not contain a dieresis
	                                    greek = typegreek_removeOne(greek);
	                                }
	                            } else {
                                    if (IOTA.indexOf(workingString.charAt(0)) > -1) {
                                    // the current string starts with a letter that receives an iota
	      
                                        if (  (workingString.indexOf('ͺ') > -1) && (workingString.indexOf('᾿') == -1)  && (workingString.indexOf('῾') == -1)  ) {
                         	            // the current string contains an iota and no breathing
                                            keepGoing = false;
	                                    } else {
	                                        greek = typegreek_removeOne(greek);     
	                                    }
	                                } else {
                                    // the current string starts with a letter that does not receive a dieresis or an iota		      
                                        greek = typegreek_removeOne(greek);	      
	                                }
	                            }
                            } else {
                            // the current string does NOT start with a capital letter
                                greek = typegreek_removeOne(greek);
                            }
                        } else {
                            keepGoing = false;
                        }
                    } else {
                        if ( (startString.charAt(0) == "῀") ) {
                        // the next character is =

                            if ( (LONG_VOWELS.indexOf(workingString.charAt(0)) > -1) && (workingString.indexOf('´') == -1)  && (workingString.indexOf('`') == -1) && (workingString.indexOf('῀') == -1) ) {
                            // the current string starts with a long vowel and it does not have any of the three accents (/, \, or =)
                            
                                if ( (CAPITALS.indexOf(workingString.charAt(0)) > -1) ) {
                                // the current string starts with a capital letter
	  
                                     if (  (DIERESIS.indexOf(workingString.charAt(0)) > -1)  ) {
                                     // the current string starts with a letter that receives a dieresis

                                         if (  (  (workingString.indexOf('᾿') > -1)  || (workingString.indexOf('῾') > -1) || (startString.charAt(1) == '᾿') || (startString.charAt(1) == '῾') )  && (workingString.indexOf('¨') == -1)  ) {
                                         // the current string contains a breathing mark (already or coming up next) and no dieresis

                                             if (  (SMOOTH_BREATHING.indexOf(workingString.charAt(0)) == -1) ) {
                                             // the current string starts with a letter that does not receive a smooth breathing		               
	               
                                                 if (  ( (workingString.indexOf('῾') > -1) || (startString.charAt(1) == '῾') )  ) {
                                                     greek = typegreek_removeOne(greek);
                                                 } else {
                                                     keepGoing = false;	                                  
	                                             }
                                             } else {
                                                 greek = typegreek_removeOne(greek);		               
                                             }
                                         } else {
                                             keepGoing = false;		           
                                         }       
                                     } else {
                                        if (  (IOTA.indexOf(workingString.charAt(0)) > -1)  ) {

                                            if (      (((workingString.indexOf('᾿') > -1)  || (workingString.indexOf('῾') > -1) || (startString.charAt(1) == '᾿') || (startString.charAt(1) == '῾')))     || ((( (workingString.indexOf('᾿') == -1)  && (workingString.indexOf('῾') == -1) && (startString.charAt(1) == 'ͺ') && (workingString.indexOf('ͺ') == -1) && (  (startString.charAt(2) == '᾿') || (startString.charAt(2) == '῾') ))))    ) {
                                            // the current string contains a breathing mark (already or coming up next) 
                                                greek = typegreek_removeOne(greek);  	              
	                                        } else {
	                                            keepGoing = false;		              
	                                        }
	                                    } else {
                                            keepGoing = false;
	                                    }
	                                }
	                            } else {
                                    greek = typegreek_removeOne(greek);  
	                            }
                            } else {
                                keepGoing = false;	                            
                            }
                        } else {
                        // the next character is not an accent mark
                        
                            if ( (startString.charAt(0) == "᾿") || (startString.charAt(0) == "῾") ) {
                            // the next character is ) or (
                            
                                if (  (ROUGH_BREATHING.indexOf(workingString.charAt(0)) > -1) && (workingString.indexOf('᾿') == -1)  && (workingString.indexOf('῾') == -1) && (workingString.indexOf('¨') == -1)  ) {
                                // the current string starts with a letter that receives a rough breathing (vowels and rho) and has no breathing mark and has no dieresis
                                    if ( startString.charAt(0) == "῾" ) {
                                    // the next character is (
                                        greek = typegreek_removeOne(greek);
                                    } else {
                                    // the next character is )
                                        if (  (SMOOTH_BREATHING.indexOf(workingString.charAt(0)) > -1)   ) {
                                        // the current string starts with a letter that receives a smooth breathing (same except for capital upsilon and capital rho)
                                            greek = typegreek_removeOne(greek);                                        
                                        } else {
                                            keepGoing = false;
                                        }
                                    }
                                } else { 
                                    keepGoing = false;                    
                                }
                            } else {
                            // the next character is not an accent or a breathing mark

                                if ( (startString.charAt(0) == "ͺ") || (startString.charAt(0) == "¨") ) {
                                // the next character is | or +
	  
                                    if ( startString.charAt(0) == "ͺ" ) {
                                    // the next character is |
	      
                                        if ( (IOTA.indexOf(workingString.charAt(0)) > -1) && (workingString.indexOf('ͺ') == -1)  ) {
                                        // the current string starts with a letter that receives an iota and has no iota
	          
                                            if (CAPITALS.indexOf(workingString.charAt(0)) > -1)  {
                                            // the current string starts with a capital letter
	              
                                                if (  ( (workingString.indexOf('´') == -1)  && (workingString.indexOf('`') == -1) && (workingString.indexOf('῀') == -1) )   ||  ( (workingString.indexOf('᾿') > -1)  || (workingString.indexOf('῾') > -1) || startString.charAt(1) == '᾿' || startString.charAt(1) == '῾' )     ) {    
                                                // the current string either has no accent mark or it has a breathing mark (already or coming up)
                                                    greek = typegreek_removeOne(greek);
                                                } else {
                                                // the current string contains an accent mark without a breathing mark (already or coming up next)
                                                    keepGoing = false;	                      
                                                }
	                                        } else {
                                                // the current string starts with a non-capital letter
                                                greek = typegreek_removeOne(greek);
                                            }   
                                        } else {
                                            keepGoing = false;  
                                        }
	                                } else  {
                                    // the next character is +
	      
                                        if ( (DIERESIS.indexOf(workingString.charAt(0)) > -1) && (workingString.indexOf('¨') == -1) && (workingString.indexOf('᾿') == -1)  && (workingString.indexOf('῾') == -1)  ) {
                                        // the current strings starts with a letter that receives a dieresis and has no dieresis and has no breathing mark
	          
                                            if (CAPITALS.indexOf(workingString.charAt(0)) > -1) {
                                            // the current string starts with a capital letter

                                                if (  (workingString.indexOf('´') == -1)  && (workingString.indexOf('`') == -1) && (workingString.indexOf('῀') == -1)  ) {
                                                // the current string does not have any of the three accents (/, \, or =)
                                                    greek = typegreek_removeOne(greek);
	                                            } else {
	                                                keepGoing = false;
	                                            }
	                                        } else {
	                                            greek = typegreek_removeOne(greek);
	                                        }
	                                    } else {
	                                        keepGoing = false;
	                                    }
	                                }
	                            } else {
	                                keepGoing = false;
	                            }
                            }
                        }
                    }
                    
                    startString = greek[0]; workingString = greek[1]; finishString = greek[2]; finishCursorStart = greek[3]; finishCursorEnd = greek[4]; currentCursor = greek[5];
                    
                } // keep checking the next characters               
       
                if (workingString.length > 1) { greek = typegreek_combineSingleCharacter(greek, control); }
                
                startString = greek[0]; workingString = greek[1]; finishString = greek[2]; finishCursorStart = greek[3]; finishCursorEnd = greek[4]; currentCursor = greek[5];	                

            } else {
            // this character cannot be combined with other characters

                if (workingString == 'σ' && TERMINAL.indexOf(startString.charAt(0)) > -1) {
                // this character is lowercase sigma and the next character 
                
                    workingString = 'ς'; 
                }
            }
        } // don't do anything if this character was the end of the string
            
        finishString = finishString + workingString;
    }
    
    greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;
    return greek;
}


/* ********************************************************************************************
   * typegreek_combineSingleCharacter (object)
   *
   * This method receives a group of Latin characters in
   * beta code that BetaToUnicode has determined constitute
   * a single legitimate Unicode character; it returns the
   * Unicode character represented by that string of characters.
   * ******************************************************************************************** */

function typegreek_combineSingleCharacter(greek, control) {
	
	var startString = greek[0]; var workingString = greek[1]; var finishString = greek[2]; var finishCursorStart = greek[3]; var finishCursorEnd = greek[4]; var currentCursor = greek[5];
	
    if (  (currentCursor - (workingString.length - 1) <= finishCursorStart) && (currentCursor >= finishCursorStart) ) {
    // the finish cursor is located at the end of any of the characters in the working string
        finishCursorStart = currentCursor - (workingString.length - 1);
    } else {
        if (currentCursor < finishCursorStart) {
        // the finish cursor is located after the end of any of the characters in the working string
            finishCursorStart = finishCursorStart - (workingString.length - 1);
        }
    }
    
    if (  (currentCursor - (workingString.length - 1) <= finishCursorEnd) && (currentCursor >= finishCursorEnd) ) {
    // the finish cursor is located at the end of any of the characters in the working string
        finishCursorEnd = currentCursor - (workingString.length - 1);
    } else {
        if (currentCursor < finishCursorEnd) {
        // the finish cursor is located after the end of any of the characters in the working string
            finishCursorEnd = finishCursorEnd - (workingString.length - 1);
        }
    }
	
    currentCursor = currentCursor - (workingString.length - 1);

    if (workingString.indexOf('´') != -1) {
    // if the string contains /
    
        if (workingString.indexOf('᾿') != -1) {
        // if the string contains )
                            
            if (workingString.indexOf('ͺ') != -1) {
            // if the string contains |
                if (workingString.charAt(0) == "α") { workingString = "ᾄ"; }            
                if (workingString.charAt(0) == "Α") { workingString = "ᾌ"; }                            
                if (workingString.charAt(0) == "η") { workingString = "ᾔ"; }            
                if (workingString.charAt(0) == "Η") { workingString = "ᾜ"; } 
                if (workingString.charAt(0) == "ω") { workingString = "ᾤ"; }            
                if (workingString.charAt(0) == "Ω") { workingString = "ᾬ"; }                 
            } else {
                if (workingString.charAt(0) == "α") { workingString = "ἄ"; }
                if (workingString.charAt(0) == "Α") { workingString = "Ἄ"; }   
                if (workingString.charAt(0) == "η") { workingString = "ἤ"; }            
                if (workingString.charAt(0) == "Η") { workingString = "Ἤ"; } 
                if (workingString.charAt(0) == "ω") { workingString = "ὤ"; }            
                if (workingString.charAt(0) == "Ω") { workingString = "Ὤ"; }                                 
                if (workingString.charAt(0) == "ε") { workingString = "ἔ"; }
                if (workingString.charAt(0) == "Ε") { workingString = "Ἔ"; }                
                if (workingString.charAt(0) == "ι") { workingString = "ἴ"; }
                if (workingString.charAt(0) == "Ι") { workingString = "Ἴ"; }                
                if (workingString.charAt(0) == "ο") { workingString = "ὄ"; }
                if (workingString.charAt(0) == "Ο") { workingString = "Ὄ"; }                                
                if (workingString.charAt(0) == "υ") { workingString = "ὔ"; }                
            }
        } else {
            if (workingString.indexOf('῾') != -1) {
            // if the string contains (

                if (workingString.indexOf('ͺ') != -1) {
                // if the string contains |
                    if (workingString.charAt(0) == "α") { workingString = "ᾅ"; }
                    if (workingString.charAt(0) == "Α") { workingString = "ᾍ"; } 
                    if (workingString.charAt(0) == "η") { workingString = "ᾕ"; }            
                    if (workingString.charAt(0) == "Η") { workingString = "ᾝ"; } 
                    if (workingString.charAt(0) == "ω") { workingString = "ᾥ"; }            
                    if (workingString.charAt(0) == "Ω") { workingString = "ᾭ"; }                     
                } else {
                    if (workingString.charAt(0) == "α") { workingString = "ἅ"; }
                    if (workingString.charAt(0) == "Α") { workingString = "Ἅ"; }
                    if (workingString.charAt(0) == "η") { workingString = "ἥ"; }            
                    if (workingString.charAt(0) == "Η") { workingString = "Ἥ"; } 
                    if (workingString.charAt(0) == "ω") { workingString = "ὥ"; }            
                    if (workingString.charAt(0) == "Ω") { workingString = "Ὥ"; }                     
                    if (workingString.charAt(0) == "ε") { workingString = "ἕ"; }
                    if (workingString.charAt(0) == "Ε") { workingString = "Ἕ"; }                
                    if (workingString.charAt(0) == "ι") { workingString = "ἵ"; }
                    if (workingString.charAt(0) == "Ι") { workingString = "Ἵ"; }                    
                    if (workingString.charAt(0) == "ο") { workingString = "ὅ"; }
                    if (workingString.charAt(0) == "Ο") { workingString = "Ὅ"; }                                    
                    if (workingString.charAt(0) == "υ") { workingString = "ὕ"; }                    
                    if (workingString.charAt(0) == "Υ") { workingString = "Ὕ"; }                    
                }           
            } else {
            // if the string contains no breathing mark

                if (workingString.indexOf('ͺ') != -1) {
                // if the string contains a |
                    if (workingString.charAt(0) == "α") { workingString = "ᾴ"; }
                    if (workingString.charAt(0) == "η") { workingString = "ῄ"; }            
                    if (workingString.charAt(0) == "ω") { workingString = "ῴ"; }            
                } else {
                    if (workingString.indexOf('¨') != -1) {
                    // if the string contains contains +
                        if (workingString.charAt(0) == "ι") { workingString = "ΐ"; }                       
                        if (workingString.charAt(0) == "υ") { workingString = "ΰ"; }                 
                    } else {
                    // if the string contains no | and no +
                        if (workingString.charAt(0) == "α") { workingString = "ά"; }
                        if (workingString.charAt(0) == "Α") { workingString = "Ά"; }
                        if (workingString.charAt(0) == "η") { workingString = "ή"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "Ή"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ώ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "Ώ"; }                         
                        if (workingString.charAt(0) == "ε") { workingString = "έ"; }
                        if (workingString.charAt(0) == "Ε") { workingString = "Έ"; } 
                        if (workingString.charAt(0) == "ι") { workingString = "ί"; }
                        if (workingString.charAt(0) == "Ι") { workingString = "Ί"; }                        
                        if (workingString.charAt(0) == "ο") { workingString = "ό"; }
                        if (workingString.charAt(0) == "Ο") { workingString = "Ό"; }                         
                        if (workingString.charAt(0) == "υ") { workingString = "ύ"; }                        
                        if (workingString.charAt(0) == "Υ") { workingString = "Ύ"; }                                                
                    }                
                }                
            }
        }
	    
    } else {
    
        if (workingString.indexOf('`') != -1) {
        // if the string contains a \
        
            if (workingString.indexOf('᾿') != -1) {
            // if the string contains a )
            
                if (workingString.indexOf('ͺ') != -1) {
                // if the string contains a |
                
                    if (workingString.charAt(0) == "α") { workingString = "ᾂ"; }
                    if (workingString.charAt(0) == "Α") { workingString = "ᾊ"; }    
                    if (workingString.charAt(0) == "η") { workingString = "ᾒ"; }            
                    if (workingString.charAt(0) == "Η") { workingString = "ᾚ"; } 
                    if (workingString.charAt(0) == "ω") { workingString = "ᾢ"; }            
                    if (workingString.charAt(0) == "Ω") { workingString = "ᾪ"; }                      	                
                } else {
	                
                    if (workingString.charAt(0) == "α") { workingString = "ἂ"; }
                    if (workingString.charAt(0) == "Α") { workingString = "Ἂ"; }    
                    if (workingString.charAt(0) == "η") { workingString = "ἢ"; }            
                    if (workingString.charAt(0) == "Η") { workingString = "Ἢ"; } 
                    if (workingString.charAt(0) == "ω") { workingString = "ὢ"; }            
                    if (workingString.charAt(0) == "Ω") { workingString = "Ὢ"; }                      	                                    
                    if (workingString.charAt(0) == "ε") { workingString = "ἒ"; }
                    if (workingString.charAt(0) == "Ε") { workingString = "Ἒ"; }   
                    if (workingString.charAt(0) == "ι") { workingString = "ἲ"; }
                    if (workingString.charAt(0) == "Ι") { workingString = "Ἲ"; }                       
                    if (workingString.charAt(0) == "ο") { workingString = "ὂ"; }
                    if (workingString.charAt(0) == "Ο") { workingString = "Ὂ"; }                      
                    if (workingString.charAt(0) == "υ") { workingString = "ὒ"; }
                }
            
            } else {
	            
                if (workingString.indexOf('῾') != -1) {
                // if the string contains a (
	               
                    if (workingString.indexOf('ͺ') != -1) {
                    // if the string contains a |                      
                    
                        if (workingString.charAt(0) == "α") { workingString = "ᾃ"; }
                        if (workingString.charAt(0) == "Α") { workingString = "ᾋ"; }
                        if (workingString.charAt(0) == "η") { workingString = "ᾓ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "ᾛ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ᾣ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "ᾫ"; }                           
                    } else {
                    // if the strings contains no iota
	                    
                        if (workingString.charAt(0) == "α") { workingString = "ἃ"; }
                        if (workingString.charAt(0) == "Α") { workingString = "Ἃ"; }
                        if (workingString.charAt(0) == "η") { workingString = "ἣ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "Ἣ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ὣ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "Ὣ"; }                        
                        if (workingString.charAt(0) == "ε") { workingString = "ἓ"; }
                        if (workingString.charAt(0) == "Ε") { workingString = "Ἓ"; }                
                        if (workingString.charAt(0) == "ι") { workingString = "ἳ"; }
                        if (workingString.charAt(0) == "Ι") { workingString = "Ἳ"; }                        
                        if (workingString.charAt(0) == "ο") { workingString = "ὃ"; }
                        if (workingString.charAt(0) == "Ο") { workingString = "Ὃ"; }                              
                        if (workingString.charAt(0) == "υ") { workingString = "ὓ"; }   
                        if (workingString.charAt(0) == "Υ") { workingString = "Ὓ"; }   
                    }
                } else {
                // if the string contains no breathing mark

                    if (workingString.indexOf('ͺ') != -1) {
                    // if the string contains |
                    
                        if (workingString.charAt(0) == "α") { workingString = "ᾲ"; }
                        if (workingString.charAt(0) == "η") { workingString = "ῂ"; }            
                        if (workingString.charAt(0) == "ω") { workingString = "ῲ"; }            
                    } else {
                    
                        if (workingString.indexOf('¨') != -1) {
                        // if the string contains + 
                        
                            if (workingString.charAt(0) == "ι") { workingString = "ῒ"; }   
                            if (workingString.charAt(0) == "υ") { workingString = "ῢ"; }

                        } else {
                        // if the string contains no | or + 
                        
                            if (workingString.charAt(0) == "α") { workingString = "ὰ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "Ὰ"; }  
                            if (workingString.charAt(0) == "η") { workingString = "ὴ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "Ὴ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ὼ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "Ὼ"; }                             
                            if (workingString.charAt(0) == "ε") { workingString = "ὲ"; }
                            if (workingString.charAt(0) == "Ε") { workingString = "Ὲ"; }  
                            if (workingString.charAt(0) == "ι") { workingString = "ὶ"; }
                            if (workingString.charAt(0) == "Ι") { workingString = "Ὶ"; }                              
                            if (workingString.charAt(0) == "ο") { workingString = "ὸ"; }
                            if (workingString.charAt(0) == "Ο") { workingString = "Ὸ"; }                                                          
                            if (workingString.charAt(0) == "υ") { workingString = "ὺ"; }
                            if (workingString.charAt(0) == "Υ") { workingString = "Ὺ"; }                            
                        }                    
                    }           
                }
            }  
        } else {
    
            if (workingString.indexOf('῀') != -1) {
            // if the string contains a =
            
                if (workingString.indexOf('᾿') != -1) {
                // if the string contains a )
                
                    if (workingString.indexOf('ͺ') != -1) {
                    // if the string contains a |                      
                        if (workingString.charAt(0) == "α") { workingString = "ᾆ"; }                
                        if (workingString.charAt(0) == "Α") { workingString = "ᾎ"; } 
                        if (workingString.charAt(0) == "η") { workingString = "ᾖ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "ᾞ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ᾦ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "ᾮ"; }                                                     
                    } else {
                        if (workingString.charAt(0) == "α") { workingString = "ἆ"; }
                        if (workingString.charAt(0) == "Α") { workingString = "Ἆ"; }                  
                        if (workingString.charAt(0) == "η") { workingString = "ἦ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "Ἦ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ὦ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "Ὦ"; }                                                                             
                        if (workingString.charAt(0) == "ι") { workingString = "ἶ"; }
                        if (workingString.charAt(0) == "Ι") { workingString = "Ἶ"; }                                          
                        if (workingString.charAt(0) == "υ") { workingString = "ὖ"; }
                    }
                } else {
	                
                    if (workingString.indexOf('῾') != -1) {
                    // if the string contains a (                  
	                
                        if (workingString.indexOf('ͺ') != -1) {
                        // if the string contains a |                      

                            if (workingString.charAt(0) == "α") { workingString = "ᾇ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "ᾏ"; }
                            if (workingString.charAt(0) == "η") { workingString = "ᾗ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "ᾟ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ᾧ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "ᾯ"; }                             
                        } else {
                            if (workingString.charAt(0) == "α") { workingString = "ἇ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "Ἇ"; } 
                            if (workingString.charAt(0) == "η") { workingString = "ἧ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "Ἧ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ὧ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "Ὧ"; }                                                         
                            if (workingString.charAt(0) == "ι") { workingString = "ἷ"; }
                            if (workingString.charAt(0) == "Ι") { workingString = "Ἷ"; }                            
                            if (workingString.charAt(0) == "υ") { workingString = "ὗ"; }                
                            if (workingString.charAt(0) == "Υ") { workingString = "Ὗ"; }                                            
                        } 
                    } else {
                    // if the string contains no breathing marks
                    
                        if (workingString.indexOf('ͺ') != -1) {
                        // if the string contains a |                      
                            if (workingString.charAt(0) == "α") { workingString = "ᾷ"; }
                            if (workingString.charAt(0) == "η") { workingString = "ῇ"; }            
                            if (workingString.charAt(0) == "ω") { workingString = "ῷ"; }                              
                        } else {
	                        
                            if (workingString.indexOf('¨') != -1) {
                            // if the string contains + 

                               if (workingString.charAt(0) == "ι") { workingString = "ῗ"; }
                               if (workingString.charAt(0) == "υ") { workingString = "ῧ"; }
                            } else {
                            // if the string contains no | or +                         
                                if (workingString.charAt(0) == "α") { workingString = "ᾶ"; }
                                if (workingString.charAt(0) == "η") { workingString = "ῆ"; }            
                                if (workingString.charAt(0) == "ω") { workingString = "ῶ"; }  	  
                                if (workingString.charAt(0) == "ι") { workingString = "ῖ"; }	  
                                if (workingString.charAt(0) == "υ") { workingString = "ῦ"; }                
                            }
                        }                     
                    }                
                }
            } else {
            // if the string contains no accent marks
            
                if (workingString.indexOf('᾿') != -1) {
                // if the string contains )
            
                    if (workingString.indexOf('ͺ') != -1) {
                    // if the string contains a |
                    
                        if (workingString.charAt(0) == "α") { workingString = "ᾀ"; }
                        if (workingString.charAt(0) == "Α") { workingString = "ᾈ"; }
                        if (workingString.charAt(0) == "η") { workingString = "ᾐ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "ᾘ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ᾠ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "ᾨ"; }                          
                    } else {
                    // if the string contains no | and no +
                    
                        if (workingString.charAt(0) == "α") { workingString = "ἀ"; }
                        if (workingString.charAt(0) == "Α") { workingString = "Ἀ"; }
                        if (workingString.charAt(0) == "η") { workingString = "ἠ"; }            
                        if (workingString.charAt(0) == "Η") { workingString = "Ἠ"; } 
                        if (workingString.charAt(0) == "ω") { workingString = "ὠ"; }            
                        if (workingString.charAt(0) == "Ω") { workingString = "Ὠ"; }                           
                        if (workingString.charAt(0) == "ε") { workingString = "ἐ"; }
                        if (workingString.charAt(0) == "Ε") { workingString = "Ἐ"; } 
                        if (workingString.charAt(0) == "ι") { workingString = "ἰ"; }
                        if (workingString.charAt(0) == "Ι") { workingString = "Ἰ"; }                        
                        if (workingString.charAt(0) == "ο") { workingString = "ὀ"; }
                        if (workingString.charAt(0) == "Ο") { workingString = "Ὀ"; }                          
                        if (workingString.charAt(0) == "υ") { workingString = "ὐ"; }
                    }        
                } else {
                    if (workingString.indexOf('῾') != -1) {
                    // if the string contains (
     
                        if (workingString.indexOf('ͺ') != -1) {
                        // if the string contains a |                      
                        
                            if (workingString.charAt(0) == "α") { workingString = "ᾁ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "ᾉ"; }   
                            if (workingString.charAt(0) == "η") { workingString = "ᾑ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "ᾙ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ᾡ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "ᾩ"; }                             
                        } else {
                        // if the string contains no iota                      
                        
                            if (workingString.charAt(0) == "α") { workingString = "ἁ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "Ἁ"; }
                            if (workingString.charAt(0) == "η") { workingString = "ἡ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "Ἡ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ὡ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "Ὡ"; }                              
                            if (workingString.charAt(0) == "ε") { workingString = "ἑ"; }
                            if (workingString.charAt(0) == "Ε") { workingString = "Ἑ"; } 
                            if (workingString.charAt(0) == "ι") { workingString = "ἱ"; }
                            if (workingString.charAt(0) == "Ι") { workingString = "Ἱ"; }                            
                            if (workingString.charAt(0) == "ο") { workingString = "ὁ"; }
                            if (workingString.charAt(0) == "Ο") { workingString = "Ὁ"; }               
                            if (workingString.charAt(0) == "Ρ") { workingString = "Ῥ"; }                                                        
                            if (workingString.charAt(0) == "ρ") { workingString = "ῥ"; }                
                            if (workingString.charAt(0) == "υ") { workingString = "ὑ"; }                
                            if (workingString.charAt(0) == "Υ") { workingString = "Ὑ"; }
                        }         
                    } else {
                    // if the string contains no breathing marks
                    
                        if (workingString.indexOf('ͺ') != -1) {
                        // if the string contains an iota
                        
                            if (workingString.charAt(0) == "α") { workingString = "ᾳ"; }
                            if (workingString.charAt(0) == "Α") { workingString = "ᾼ"; }  
                            if (workingString.charAt(0) == "η") { workingString = "ῃ"; }            
                            if (workingString.charAt(0) == "Η") { workingString = "ῌ"; } 
                            if (workingString.charAt(0) == "ω") { workingString = "ῳ"; }            
                            if (workingString.charAt(0) == "Ω") { workingString = "ῼ"; }                            
                        } else {
                            if (workingString.indexOf('¨') != -1) {
                            // if the string contains a dieresis

                                if (workingString.charAt(0) == "ι") { workingString = "ϊ"; }
                                if (workingString.charAt(0) == "Ι") { workingString = "Ϊ"; } 
                                if (workingString.charAt(0) == "υ") { workingString = "ϋ"; }
                                if (workingString.charAt(0) == "Υ") { workingString = "Ϋ"; }	  
	  
                            } // if there are no marks at all, then do nothing
                        }
                    }
                }
            }
        }
    }

    greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;
    return greek;

}


/* ********************************************************************************************
   * typegreek_removeOne ()
   * ******************************************************************************************** */

function typegreek_removeOne(greek) {
	
	var startString = greek[0]; var workingString = greek[1]; var finishString = greek[2]; var finishCursorStart = greek[3]; var finishCursorEnd = greek[4]; var currentCursor = greek[5];
	
    workingString = workingString + startString.substr(0,1);
    startString = startString.substr(1, startString.length - 1);
    currentCursor = currentCursor + 1;

    greek[0] = startString; greek[1] = workingString; greek[2] = finishString; greek[3] = finishCursorStart; greek[4] = finishCursorEnd; greek[5] = currentCursor;
    return greek;
    
}