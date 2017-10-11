
class BzCounter {
	constructor(){

	}
	count(birthday,month,clock){
		var result = {};
		// ----干支
		var gzYear = getGZYear(birthday);
		var gzMonth = getGZMonth(birthday,month)
		var gzDay = getGZDay(birthday);
        var gzClock=getGZClock(birthday,clock);
		var gz = gzYear + ""+gzMonth + ""+gzDay + ""+gzClock;
		
        //----阴阳
        var tt = gz.split("");
        var yinyang="";
        for(var i=0;i<tt.length;i++){
            if(i%2==0) {
                yinyang += (getYY(tt[i], 0));
            }else{
                yinyang += (getYY(tt[i], 1));
            }
        }
        //----五行
        var wx="";
        for(var i=0;i<tt.length;i++){
            if(i%2==0) {
                wx += (getWX(tt[i], 0));
            }else{
                wx += (getWX(tt[i], 1));
            }
        }
        //---性质
        var yys=yinyang.split("");
        //---生克
        //List<String> shengke =new ArrayList<String>();
        var shishen = [];
        var wxs = wx.split("");
        var t = ["年柱","月柱","日坐","时柱"]
		
        for (var i=0;i<wxs.length;i++){
            var SK='',SHEN='',xingzhi = '';
            if((i % 2)==0 && i!=4){
                //------年，月，时
                SK = getShengKe(wxs[4],wxs[i]);
                if(yys[4]== yys[i]){
                    xingzhi = "同性";
                } else {
                    xingzhi = "异性";
                }
                SHEN = getSHEN(xingzhi,SK);
                SHEN = t[Math.floor(i/2)] + ":" +SHEN;
                shishen.push(SHEN)
                // += ("https://www.bing.com/search?q="+SHEN)+"    "
            } else if(i===4){
                SK = getShengKe(wxs[4],wxs[5])
                if(yys[4]== yys[5]){
                    xingzhi = "同性";
                } else {
                    xingzhi = "异性";
                }
                SHEN = getSHEN(xingzhi,SK);
                SHEN = t[Math.floor(i/2)] + ":" +SHEN;
                shishen.push(SHEN)
            }
        }
        //------
		result.gz = gz
		result.yinyang = yinyang
		result.wx = wx
		result.shishen= shishen

		return result
	}
}

function getGZYear (birthday) {
	var year = birthday.getFullYear()
	var gans=["庚","辛","壬","癸","甲","乙","丙","丁","戊","己"];
    var zhis=["酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申"];

    var g = year % 10;
    var gy="";
    var z = year % 12 - 1;
    var zy="";
    if (z<0){
        z=11;
    }
    return (gans[g]+gy+zhis[z]+zy);
}
function getGZMonth(birthday,month){
	var year = birthday.getFullYear()
    var gans=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    var zhis=["寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑"]
        //年天干
    var gYear = getGZYear(birthday).split("")[0];
    var tmp=0;
    for(var i=0;i<gans.length;i++){
        tmp++;
        if(gYear==gans[i]){
            break;
        }
    }
    //年天干：甲（己）年，正月为丙寅
    if(tmp>5){tmp = tmp - 5;}
    tmp = (tmp)*2+1;    //凑出规律
    var yg;
    yg = (tmp + (month - 1))%10 ;//---增加月份的因素
    if(yg==0){
        yg=10;
    }
    return gans[yg - 1]+zhis[month-1];
}
function getGZDay(birthday){
        var gans=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
        var zhis=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

        
            var fDate = new Date("1912-02-18");
            var dBirthday = new Date(birthday)
            if (null == fDate || null == dBirthday) {
                return "";
            }

            var intervalMilli = dBirthday.getTime() - fDate.getTime();
            var days =  Math.floor(intervalMilli / (24 * 60 * 60 * 1000));
            var tmp = days % 60;
            var g = tmp % 10;
            var z = tmp % 12;
            return gans[g]+zhis[z];
        
    }
function getGZClock(birthday,clock){
        var gans=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
        var zhis=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子"]
        var gzDay = getGZDay(birthday);
        var zClock = "";

        var sZ =0;
        if(clock%2==0){
            sZ = clock/2 -1;
        }else{
            sZ = (clock + 1) /2 - 1  ;
        }
        zClock = zhis[sZ+1];//---zhis应从-1开始；
        //System.out.println("时支："+zClock);
        var gDay = gzDay.substring(0,1);
        var gD = 0;
        for(var i=0;i<gans.length;i++){
        	var g = gans[i]
            gD++;
            if(gDay == g ){
                break;
            }
        }
        var tmp = gD*2 + (sZ);//时支数组是从0开始的
        if(tmp>=10){
            var t = Math.floor(tmp /10);
            tmp = tmp - t * 10;
            if (tmp==0){
                tmp = 10;
            }
        }
        var gClock = gans[tmp - 1]
        return gClock + zClock;
    }
function getYY( str, type){
        var yangs="";
        var yins ="";
        if(type==0) {
            //---- 天干
            yangs="甲、丙、戊、庚、壬";
            yins ="乙、丁、己、辛、癸";
        }else{
            //---- 地支
            yangs="子、寅、辰、午、申、戌";
            yins ="丑、卯、巳、未、酉、亥";
        }
        if(yangs.indexOf(str)>=0){
            return "阳";
        }else if(yins.indexOf(str)>=0){
            return "阴";
        }
        return str;
    }
function getWX( str, type){
        var mu="",huo="",tu="",jin="",shui="";

        if(type==0) {
            //---- 天干
            mu="甲乙";
            huo="丙丁";
            tu="戊己";
            jin="庚辛";
            shui="壬癸";
        }else{
            //---- 地支
            mu="寅、卯";
            huo="午、巳";
            tu="辰、戌、丑、未";
            jin="申、酉";
            shui="子、亥";
        }
        if(mu.indexOf(str)>=0){
            return "木";
        }else if(huo.indexOf(str)>=0){
            return "火";
        }else if(tu.indexOf(str)>=0){
            return "土";
        }else if(jin.indexOf(str)>=0){
            return "金";
        }else if(shui.indexOf(str)>=0){
            return "水";
        }
        return str;
    }
function getShengKe ( one1, one2){
        var rel_sheng="金水木火土金";
        var rel_ke = "金木土水火金";
        var rtn="";
        if (one1=== one2){
            rtn = "同我";
        } else {
            if (rel_sheng.indexOf(one1 + one2) >= 0) {
                rtn = "我生";
            } else if (rel_sheng.indexOf(one2 + one1) >= 0) {
                rtn = "生我";
            }
            if (rel_ke.indexOf(one1 + one2) >= 0) {
                rtn = "我克";
            } else if (rel_ke.indexOf(one2 + one1) >= 0) {
                rtn = "克我";
            }
        }
        return rtn;
    }
function getSHEN( xingzhi, SK){
        var shishen = [
                "正官:异性,克我:xxxxxx","偏官:同性,克我:xxxxxx",
                "正印:异性,生我:xxxxx","偏印:同性,生我:xxxxx",
                "正财:异性,我克:xxxxxx","偏财:同性,我克:xxxxxx",
                "伤官:异性,我生:xxxxx","食神:同性,我生:xxxxx",
                "劫财:异性,同我:xxxxx","比肩:同性,同我:xxxxx"]
        var one = xingzhi + "," +SK;
        var rtn = "";
        for (var i=0;i<shishen.length;i++) {
        	var SHEN = shishen[i]
            if (SHEN.indexOf(one) >= 0) {
                rtn =  SHEN.split(":")[0];

                break;
            }
        }
        return rtn;
    }
module.exports = BzCounter

