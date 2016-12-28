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
