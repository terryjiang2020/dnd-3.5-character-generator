	var aTreasure = new Array(
		300, 600, 900, 1200, 1600, 2000, 2600, 3400, 4500, 5800, 7500, 9800, 13000, 17000, 22000, 28000, 36000, 47000, 61000, 80000, 87000, 96000, 106000, 116000, 128000, 141000, 155000, 170000, 187000, 206000, 227000, 249000, 274000, 302000, 332000, 365000, 401000, 442000, 486000, 534000
	);

	function mFilterInputLevels(strX)
	{
		if (strX == "1/2") return 1/2;
		if (strX == "1/3") return 1/3;
		if (strX == "1/4") return 1/4;
		if (strX == "1/6") return 1/6;
		if (strX == "1/8") return 1/8;
		if (strX == "1/10") return 1/10;
		return parseFloat(strX);
	}

	function RoundOnePlace(x)
	{
		return Math.round(x * 10) / 10;
	}

	function Log2(x)
	{
		return Math.LOG2E * Math.log(x);
	}
	
	function mCRtoPL(x)
	{
		var iReturn = 0;
		if (x < 2) iReturn = x;
		else iReturn = Math.pow(2, (x/ 2));
		return iReturn;
	}

	function mPLtoCR(x)
	{
		var iReturn = 0;
		if (x < 2) iReturn = x;
		else iReturn = 2 * Log2(x);
		return iReturn;
	}
	
	function mDifference(x, y)
	{
		return 2 * (Log2(x) - Log2(y));
	}
	
	function mDifficulty(x)
	{
		var strReturn = "Unknown";
		if (x < -9) strReturn = "Trivial";
		else if (x < -4) strReturn = "Very Easy";
		else if (x <  0) strReturn = "Easy";
		else if (x <= 0) strReturn = "Challenging";
		else if (x <= 4) strReturn = "Very Difficult";
		else if (x <= 7) strReturn = "Overpowering";
		else strReturn = "Unbeatable";
		return strReturn;	
	}
	
	function mPercentEnc(x)
	{
		var strReturn = "Unknown";
		if (x < -4) strReturn = "0%";
		else if (x <  0) strReturn = "10%";
		else if (x <= 0) strReturn = "50%";
		else if (x <= 4) strReturn = "15%";
		else if (x <= 7) strReturn = "5%";
		else strReturn = "0%";
		return strReturn;	
	}
	
	function mPercentEncs(x)
	{
	// What percentage of an adventures encounters should be at this EL.
		var p=0;
		if (x < 0) p = 50 + (x * 20);
		else if (x > 5) p = 15 - ((x-5) * 5);
		else p = 50 - (x * 7);

		if (x <=8 && x > 5 && p <=2) p = 2; // special case guess.
		if (p < 0) p = 0;
		
		p = Math.round(p); // smooth it out a bit.
		return p +"%";
	}
	
	function mEven(x)
	{
		var iReturn = 2 * parseInt(x/2);
		if (x < iReturn) iReturn += -2;
		else if (x > iReturn) iReturn += 2;
		return iReturn;
	}
	
	function mExperience(x, y)
	{
		// x = PClevel y = monsterlevel
		var iReturn = 0;
		if (x < 3) x = 3;
		if ((x <= 6) && (y <= 1)) iReturn = 300 * y;
		else if (y < 1) iReturn = 0;
		
		// This formula looks nice, but 3.5 doesn't follow a smooth formula like 3.0 did.
		else iReturn = 6.25 * x * ( Math.pow(2,mEven(7- (x-y) ) /2) ) * ( 11-(x-y) - mEven(7-(x-y)) );

		// Below catches places where the formula fails for 3.5.
		if ((y == 4) || (y == 6) || (y == 8) || (y == 10) || (y == 12) || 
			(y == 14) ||(y == 16) ||(y == 18) ||(y == 20))
		{
			if (x <= 3) iReturn = 1350 * Math.pow(2,(y-4)/2);
			else if (x == 5 && y >= 6) iReturn = 2250 * Math.pow(2,(y-6)/2);
			else if (x == 7 && y >= 8) iReturn = 3150 * Math.pow(2,(y-8)/2);
			else if (x == 9 && y >= 10) iReturn = 4050 * Math.pow(2,(y-10)/2);
			else if (x == 11 && y >= 12) iReturn = 4950 * Math.pow(2,(y-12)/2);
			else if (x == 13 && y >= 14) iReturn = 5850 * Math.pow(2,(y-14)/2);
			else if (x == 15 && y >= 16) iReturn = 6750 * Math.pow(2,(y-16)/2);
			else if (x == 17 && y >= 18) iReturn = 7650 * Math.pow(2,(y-18)/2);
			else if (x == 19 && y >= 20) iReturn = 8550 * Math.pow(2,(y-20)/2);
		}
		if ((y == 7) || (y == 9) || (y == 11) || (y == 13) || (y == 15) || 
			(y == 17) ||(y == 19))
		{
			if (x == 6) iReturn = 2700 * Math.pow(2,(y-7)/2);
			if (x == 8 && y >= 9) iReturn = 3600 * Math.pow(2,(y-9)/2);
			if (x == 10 && y >= 11) iReturn = 4500 * Math.pow(2,(y-11)/2);
			if (x == 12 && y >= 13) iReturn = 5400 * Math.pow(2,(y-13)/2);
			if (x == 14 && y >= 15) iReturn = 6300 * Math.pow(2,(y-15)/2);
			if (x == 16 && y >= 17) iReturn = 7200 * Math.pow(2,(y-17)/2);
			if (x == 18 && y >= 19) iReturn = 8100 * Math.pow(2,(y-19)/2);
		}
		
		if (y > 20) iReturn = 2 * mExperience(x, y-2);
		// recursion should end this in short order.
		// This method is clean, and ensures any errors in the above
		// formulas for 3.5 are accounted for.
		
		// Finally we correct for out of bounds entries, doing this last to cut space on the
		// above formulas.
		if (x - y > 7) iReturn = 0;
		else if (y - x > 7) iReturn = 0;

		return iReturn;
	}

	function mTreasure(x)
	{
		if (x > 40) x = 40; // Not a clean solution. But no idea what ELs above 20 should give.
		x2 = parseInt(x);
		if (x < 1) iReturn = x * aTreasure[0];
		else if (x > x2) iReturn = aTreasure[x2-1] + (x-x2) * (aTreasure[x2] - aTreasure[x2-1]);
		else iReturn = aTreasure[x2-1];
		
		return iReturn;
	}
	
	function xDy (x,y)
	{
		return xDyPz (x,y,0);
	}
	
	function xDyPz (x,y,z)
	{

		//alert (x+"d"+y+"+"+z);
		for (x; x > 0; x--)
		{
			z += Math.round(Math.random() * y);
			//alert("X: "+x+" Z: "+z);
		}
		//alert ("Z: "+z);
		return z;
	}
	
	function findSpotDistance(terrainType)
	{
		var spotDist = 0;
		var isTxt = false;

		switch (terrainType)
		{
			case "dpForest":
			case "rHills":
				spotDist = xDy (2,6) * 10 + " (2d6x10)";
				break
			case "spForest":
				spotDist = xDy (3,6) * 10 + " (3d6x10)";
				break
			case "Moor":
			case "DesertDunes":
				spotDist = xDy (6,6) * 10 + " (6d6x10)";
				break
			case "Desert":
				spotDist = xDy (6,6) * 20 + " (6d6x20)";
				break
			case "Plains":
				spotDist = xDy (6,6) * 40 + " (6d6x40)";
				break
			case "mWater":
				spotDist = xDy (1,8) * 10 + " (1d8x10)";
				break
			case "mpForest":
			case "Swamp":
				spotDist = xDy (2,8) * 10 + " (2d8x10)";
				break
			case "cWater":
				spotDist = xDy (4,8) * 10 + " (4d8x10)";
				break
			case "gHills":
				spotDist = xDy (2,10) * 10 + " (2d10x10)";
				break
			case "Mount":
				spotDist = xDy (4,10) * 10 + " (4d10x10)";
				break
			case "Dungeon":
				spotDist = "Line of sight and lighting";
				isTxt = true;
				break
			case "Urban":
				spotDist = "when event triggered";
				isTxt = true;
				break
			default:
				spotDist = "ERROR";
				isTxt = true;
		}
		if (isTxt == true) return spotDist;
		else return spotDist + " feet away";
	}

	function mCalculate()
	{
		var iCount = 0;
		
		with (document.myform)
		{
			var iParty1Number = parseFloat(txtParty1Number.value);
			var iParty2Number = parseFloat(txtParty2Number.value);
			var iParty3Number = parseFloat(txtParty3Number.value);
			var iParty4Number = parseFloat(txtParty4Number.value);
			var iParty5Number = parseFloat(txtParty5Number.value);
			var iParty6Number = parseFloat(txtParty6Number.value);
		
			var iParty1Level = mFilterInputLevels(txtParty1Level.value);
			var iParty2Level = mFilterInputLevels(txtParty2Level.value);
			var iParty3Level = mFilterInputLevels(txtParty3Level.value);
			var iParty4Level = mFilterInputLevels(txtParty4Level.value);
			var iParty5Level = mFilterInputLevels(txtParty5Level.value);
			var iParty6Level = mFilterInputLevels(txtParty6Level.value);
		
			var iMonster1Number = parseFloat(txtMonster1Number.value);
			var iMonster2Number = parseFloat(txtMonster2Number.value);
			var iMonster3Number = parseFloat(txtMonster3Number.value);
			var iMonster4Number = parseFloat(txtMonster4Number.value);
			var iMonster5Number = parseFloat(txtMonster5Number.value);
			var iMonster6Number = parseFloat(txtMonster6Number.value);
		
			var iMonster1Level = mFilterInputLevels(txtMonster1Level.value);
			var iMonster2Level = mFilterInputLevels(txtMonster2Level.value);
			var iMonster3Level = mFilterInputLevels(txtMonster3Level.value);
			var iMonster4Level = mFilterInputLevels(txtMonster4Level.value);
			var iMonster5Level = mFilterInputLevels(txtMonster5Level.value);
			var iMonster6Level = mFilterInputLevels(txtMonster6Level.value);
		}

		var iParty1Power = iParty1Number * mCRtoPL(iParty1Level);
		var iParty2Power = iParty2Number * mCRtoPL(iParty2Level);
		var iParty3Power = iParty3Number * mCRtoPL(iParty3Level);
		var iParty4Power = iParty4Number * mCRtoPL(iParty4Level);
		var iParty5Power = iParty5Number * mCRtoPL(iParty5Level);
		var iParty6Power = iParty6Number * mCRtoPL(iParty6Level);
		var iPartyTotalPower = (iParty1Power + iParty2Power + iParty3Power + iParty4Power + iParty5Power + iParty6Power) /4;
		var iPartyEffectiveLevel = mPLtoCR(iPartyTotalPower);

		var iPartyTotal = iParty1Number + iParty2Number + iParty3Number + iParty4Number + iParty5Number + iParty6Number;
		iCount += iParty1Number * iParty1Level;
		iCount += iParty2Number * iParty2Level;
		iCount += iParty3Number * iParty3Level;
		iCount += iParty4Number * iParty4Level;
		iCount += iParty5Number * iParty5Level;
		iCount += iParty6Number * iParty6Level;
		var iPartyAverageLevel = iCount / iPartyTotal;

		var iMonster1Power = iMonster1Number * mCRtoPL(iMonster1Level);
		var iMonster2Power = iMonster2Number * mCRtoPL(iMonster2Level);
		var iMonster3Power = iMonster3Number * mCRtoPL(iMonster3Level);
		var iMonster4Power = iMonster4Number * mCRtoPL(iMonster4Level);
		var iMonster5Power = iMonster5Number * mCRtoPL(iMonster5Level);
		var iMonster6Power = iMonster6Number * mCRtoPL(iMonster6Level);
		var iMonsterTotalPower = iMonster1Power + iMonster2Power + iMonster3Power + iMonster4Power + iMonster5Power + iMonster6Power;
		var iMonsterTotalLevel = mPLtoCR(iMonsterTotalPower);

		var iDifference = mDifference(iMonsterTotalPower, iPartyTotalPower);

		var iMonster1Experience = iMonster1Number * mExperience(iPartyAverageLevel, iMonster1Level);
		var iMonster2Experience = iMonster2Number * mExperience(iPartyAverageLevel, iMonster2Level);
		var iMonster3Experience = iMonster3Number * mExperience(iPartyAverageLevel, iMonster3Level);
		var iMonster4Experience = iMonster4Number * mExperience(iPartyAverageLevel, iMonster4Level);
		var iMonster5Experience = iMonster5Number * mExperience(iPartyAverageLevel, iMonster5Level);
		var iMonster6Experience = iMonster6Number * mExperience(iPartyAverageLevel, iMonster6Level);
		var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
		var iCRExperience = iMonsterTotalExperience / iPartyTotal;

		if(iParty1Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty1Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty1Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty1Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty1Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty1Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty1Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR1Experience = iMonsterTotalExperience / iPartyTotal;
		};

		if(iParty2Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty2Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty2Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty2Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty2Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty2Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty2Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR2Experience = iMonsterTotalExperience / iPartyTotal;
		};

		if(iParty3Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty3Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty3Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty3Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty3Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty3Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty3Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR3Experience = iMonsterTotalExperience / iPartyTotal;
		};

		if(iParty4Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty4Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty4Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty4Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty4Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty4Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty4Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR4Experience = iMonsterTotalExperience / iPartyTotal;
		};

		if(iParty5Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty5Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty5Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty5Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty5Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty5Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty5Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR5Experience = iMonsterTotalExperience / iPartyTotal;
		};

		if(iParty6Number > 0)
		{
			var iMonster1Experience = iMonster1Number * mExperience(iParty6Level, iMonster1Level);
			var iMonster2Experience = iMonster2Number * mExperience(iParty6Level, iMonster2Level);
			var iMonster3Experience = iMonster3Number * mExperience(iParty6Level, iMonster3Level);
			var iMonster4Experience = iMonster4Number * mExperience(iParty6Level, iMonster4Level);
			var iMonster5Experience = iMonster5Number * mExperience(iParty6Level, iMonster5Level);
			var iMonster6Experience = iMonster6Number * mExperience(iParty6Level, iMonster6Level);
			var iMonsterTotalExperience = iMonster1Experience + iMonster2Experience + iMonster3Experience + iMonster4Experience + iMonster5Experience + iMonster6Experience;
			var iCR6Experience = iMonsterTotalExperience / iPartyTotal;
		};

		with (document.myform)
		{
			txtCR1Experience.value = Math.round(iCR1Experience);
			txtCR2Experience.value = Math.round(iCR2Experience);
			txtCR3Experience.value = Math.round(iCR3Experience);
			txtCR4Experience.value = Math.round(iCR4Experience);
			txtCR5Experience.value = Math.round(iCR5Experience);
			txtCR6Experience.value = Math.round(iCR6Experience);
			
			txtPartyEffectiveLevel.value = RoundOnePlace(iPartyEffectiveLevel);
			txtMonsterTotalLevel.value = Math.round(iMonsterTotalLevel);
			txtDifficulty.value = mDifficulty(iDifference);
			txtPercentEnc.value = mPercentEnc(iDifference);
			txtTreasure.value = RoundOnePlace(mTreasure(iMonsterTotalLevel));
			
			txtSpotDistance.value = findSpotDistance(txtterrainType.value);
		}
		return;
	}