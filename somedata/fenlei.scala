//分类
val lines = scala.io.Source.fromFile("wordCount.txt").getLines()
val r = lines.filter(_ != "").map(x => {
    val p = x.substring(1, x.length - 1).split(",")
    (p(0), p(1).toInt)
  }).toList.sortWith(_._2 < _._2).groupBy(_._2.toString.length)  // 按频率长度统计
  
  // 各长度出现的次数
  val rc=r.map(x => {
    (x._1, x._2.size)
  }).toList.sortWith(_._2<_._2) // result is List((3,4), (1,6), (4,19), (2,23), (7,59), (5,120), (6,236))
  // so 1 2 3 4 是一类
  // 5 ,6 ,7各自一类
  println(r.keys)
  println(rc)

val rcr=r.map({
    case (x,y) if x<=4 =>("AC",y)
    case (x,y) if x==5 =>("BC",y)
    case (x,y) if x==6 =>("CC",y)
    case (x,y) if x==7 =>("DC",y)
  }).foreach(x=>{
    writeUtf8(s"./${x._1.toString}.txt"){
      x._2.sortWith(_._2>_._2)
    }
  })

def writeUtf8(fileName: String)(d: List[Any]): Unit = {
    val out = new PrintStream(new FileOutputStream(new File(fileName), true), true, "utf8")
    out.println(d.mkString("\n"))
    out.close()
  }
