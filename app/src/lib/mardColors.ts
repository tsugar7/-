// Mard 拼豆色号数据库 - 共291色
export interface MardColor {
  code: string;
  hex: string;
  r: number;
  g: number;
  b: number;
  name?: string;
}

// 将HEX转换为RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

// Mard 色号数据
const mardColorData: { code: string; hex: string; name?: string }[] = [
  // A系列 - 黄色/橙色
  { code: "A1", hex: "#FAF4C8", name: "浅奶油" },
  { code: "A2", hex: "#FFFFD5", name: "象牙白" },
  { code: "A3", hex: "#FEFF8B", name: "柠檬黄" },
  { code: "A4", hex: "#FBED56", name: "金黄" },
  { code: "A5", hex: "#F4D738", name: "向日葵" },
  { code: "A6", hex: "#FEAC4C", name: "杏黄" },
  { code: "A7", hex: "#FE8B4C", name: "橙黄" },
  { code: "A8", hex: "#FFDA45", name: "香蕉黄" },
  { code: "A9", hex: "#FF995B", name: "浅橙" },
  { code: "A10", hex: "#F77C31", name: "活力橙" },
  { code: "A11", hex: "#FFDD99", name: "蜜桃" },
  { code: "A12", hex: "#FE9F72", name: "珊瑚" },
  { code: "A13", hex: "#FFC365", name: "芒果" },
  { code: "A14", hex: "#FD543D", name: "番茄红" },
  { code: "A15", hex: "#FFF365", name: "金丝雀" },
  { code: "A16", hex: "#FFFF9F", name: "浅柠檬" },
  { code: "A17", hex: "#FFE36E", name: "蛋黄" },
  { code: "A18", hex: "#FEBE7D", name: "奶油橙" },
  { code: "A19", hex: "#FD7C72", name: "三文鱼" },
  { code: "A20", hex: "#FFD568", name: "玉米黄" },
  { code: "A21", hex: "#FFE395", name: "香草" },
  { code: "A22", hex: "#F4F57D", name: "黄绿" },
  { code: "A23", hex: "#E6C9B7", name: "拿铁" },
  { code: "A24", hex: "#F7F8A2", name: "浅黄" },
  { code: "A25", hex: "#FFD67D", name: "蜂蜜" },
  { code: "A26", hex: "#FFC830", name: "金黄" },

  // B系列 - 绿色
  { code: "B1", hex: "#E6EE31", name: "青柠" },
  { code: "B2", hex: "#63F347", name: "荧光绿" },
  { code: "B3", hex: "#9EF780", name: "薄荷绿" },
  { code: "B4", hex: "#5DE035", name: "草绿" },
  { code: "B5", hex: "#35E352", name: "翠绿" },
  { code: "B6", hex: "#65E2A6", name: "春绿" },
  { code: "B7", hex: "#3DAF80", name: "海绿" },
  { code: "B8", hex: "#1C9C4F", name: "翡翠" },
  { code: "B9", hex: "#27523A", name: "深林绿" },
  { code: "B10", hex: "#95D3C2", name: "浅水绿" },
  { code: "B11", hex: "#5D722A", name: "橄榄绿" },
  { code: "B12", hex: "#166F41", name: "松绿" },
  { code: "B13", hex: "#CAEB7B", name: "嫩芽" },
  { code: "B14", hex: "#ADE946", name: "苹果绿" },
  { code: "B15", hex: "#2E5132", name: "墨绿" },
  { code: "B16", hex: "#C5ED9C", name: "淡绿" },
  { code: "B17", hex: "#9BB13A", name: "苔藓" },
  { code: "B18", hex: "#E6EE49", name: "黄绿" },
  { code: "B19", hex: "#24B88C", name: "青绿" },
  { code: "B20", hex: "#C2F0CC", name: "水绿" },
  { code: "B21", hex: "#156A6B", name: "深青" },
  { code: "B22", hex: "#0B3C43", name: "暗青" },
  { code: "B23", hex: "#303A21", name: "军绿" },
  { code: "B24", hex: "#EEFCA5", name: "浅芽绿" },
  { code: "B25", hex: "#4E846D", name: "灰绿" },
  { code: "B26", hex: "#8D7A35", name: "卡其绿" },
  { code: "B27", hex: "#CCE1AF", name: "抹茶" },
  { code: "B28", hex: "#9EE5B9", name: "薄荷" },
  { code: "B29", hex: "#C5E254", name: "梨绿" },
  { code: "B30", hex: "#E2FCB1", name: "淡芽" },
  { code: "B31", hex: "#B0E792", name: "浅草" },
  { code: "B32", hex: "#9CAB5A", name: "橄榄" },

  // C系列 - 蓝色
  { code: "C1", hex: "#E8FFE7", name: "极浅蓝" },
  { code: "C2", hex: "#A9F9FC", name: "天蓝" },
  { code: "C3", hex: "#A0E2FB", name: "浅天蓝" },
  { code: "C4", hex: "#41CCFF", name: "亮蓝" },
  { code: "C5", hex: "#01ACEB", name: "湖蓝" },
  { code: "C6", hex: "#50AAF0", name: "天青" },
  { code: "C7", hex: "#3677D2", name: "钴蓝" },
  { code: "C8", hex: "#0F54C0", name: "深蓝" },
  { code: "C9", hex: "#324BCA", name: "宝蓝" },
  { code: "C10", hex: "#3EBCE2", name: "水蓝" },
  { code: "C11", hex: "#28DDDE", name: "青蓝" },
  { code: "C12", hex: "#1C334D", name: "深夜蓝" },
  { code: "C13", hex: "#CDE8FF", name: "淡蓝" },
  { code: "C14", hex: "#D5FDFF", name: "冰蓝" },
  { code: "C15", hex: "#22C4C6", name: " turquoise" },
  { code: "C16", hex: "#1557A8", name: "海军蓝" },
  { code: "C17", hex: "#04D1F6", name: "霓虹蓝" },
  { code: "C18", hex: "#1D3344", name: "墨蓝" },
  { code: "C19", hex: "#1887A2", name: "孔雀蓝" },
  { code: "C20", hex: "#176DAF", name: "钢蓝" },
  { code: "C21", hex: "#BEDDFF", name: "婴儿蓝" },
  { code: "C22", hex: "#67B4BE", name: "灰蓝" },
  { code: "C23", hex: "#C8E2FF", name: "云雾蓝" },
  { code: "C24", hex: "#7CC4FF", name: "晴空" },
  { code: "C25", hex: "#A9E5E5", name: "浅青" },
  { code: "C26", hex: "#3CAED8", name: "海洋蓝" },
  { code: "C27", hex: "#D3DFFA", name: "薰衣草蓝" },
  { code: "C28", hex: "#BBCFED", name: "淡紫蓝" },
  { code: "C29", hex: "#34488E", name: "深宝蓝" },

  // D系列 - 紫色
  { code: "D1", hex: "#AEB4F2", name: "淡紫" },
  { code: "D2", hex: "#858EDD", name: "浅紫" },
  { code: "D3", hex: "#2F54AF", name: "紫蓝" },
  { code: "D4", hex: "#182A84", name: "深紫蓝" },
  { code: "D5", hex: "#B843C5", name: "紫罗兰" },
  { code: "D6", hex: "#AC7BDE", name: "淡紫罗兰" },
  { code: "D7", hex: "#8854B3", name: "深紫" },
  { code: "D8", hex: "#E2D3FF", name: "薰衣草" },
  { code: "D9", hex: "#D5B9F8", name: "浅薰衣草" },
  { code: "D10", hex: "#361851", name: "深紫" },
  { code: "D11", hex: "#B9BAE1", name: "灰紫" },
  { code: "D12", hex: "#DE9AD4", name: "粉紫" },
  { code: "D13", hex: "#B90095", name: "玫红" },
  { code: "D14", hex: "#8B279B", name: "深玫红" },
  { code: "D15", hex: "#2F1F90", name: "靛蓝" },
  { code: "D16", hex: "#E3E1EE", name: "淡蓝紫" },
  { code: "D17", hex: "#C4D4F6", name: "天蓝紫" },
  { code: "D18", hex: "#A45EC7", name: "紫水晶" },
  { code: "D19", hex: "#D8C3D7", name: "藕荷" },
  { code: "D20", hex: "#9C32B2", name: "深紫罗兰" },
  { code: "D21", hex: "#9A009B", name: "紫红" },
  { code: "D22", hex: "#333A95", name: "暗紫" },
  { code: "D23", hex: "#EBDAFC", name: "极浅紫" },
  { code: "D24", hex: "#7786E5", name: "蓝紫" },
  { code: "D25", hex: "#494FC7", name: "中紫" },
  { code: "D26", hex: "#DFC2F8", name: "淡紫罗兰" },

  // E系列 - 粉色/红色
  { code: "E1", hex: "#FDD3CC", name: "浅粉" },
  { code: "E2", hex: "#FEC0DF", name: "粉红" },
  { code: "E3", hex: "#FFB7E7", name: "桃粉" },
  { code: "E4", hex: "#E8649E", name: "玫瑰粉" },
  { code: "E5", hex: "#F551A2", name: "亮粉" },
  { code: "E6", hex: "#F13D74", name: "桃红" },
  { code: "E7", hex: "#C63478", name: "深粉" },
  { code: "E8", hex: "#FFDBE9", name: "极浅粉" },
  { code: "E9", hex: "#E970CC", name: "紫粉" },
  { code: "E10", hex: "#D33793", name: "深玫" },
  { code: "E11", hex: "#FCDDD2", name: "肤粉" },
  { code: "E12", hex: "#F78FC3", name: "樱花粉" },
  { code: "E13", hex: "#B5006D", name: "酒红" },
  { code: "E14", hex: "#FFD1BA", name: "杏粉" },
  { code: "E15", hex: "#F8C7C9", name: "浅玫瑰" },
  { code: "E16", hex: "#FFF3EB", name: "米白" },
  { code: "E17", hex: "#FFE2EA", name: "淡桃" },
  { code: "E18", hex: "#FFC7DB", name: "浅桃红" },
  { code: "E19", hex: "#FEBAD5", name: "糖果粉" },
  { code: "E20", hex: "#D8C7D1", name: "藕粉" },
  { code: "E21", hex: "#BD9DA1", name: "灰粉" },
  { code: "E22", hex: "#B785A1", name: "暗粉" },
  { code: "E23", hex: "#937A8D", name: "深藕" },
  { code: "E24", hex: "#E1BCE8", name: "淡紫粉" },

  // F系列 - 红色系
  { code: "F1", hex: "#FD957B", name: "珊瑚红" },
  { code: "F2", hex: "#FC3D46", name: "亮红" },
  { code: "F3", hex: "#F74941", name: "番茄红" },
  { code: "F4", hex: "#FC283C", name: "正红" },
  { code: "F5", hex: "#E7002F", name: "大红" },
  { code: "F6", hex: "#943630", name: "砖红" },
  { code: "F7", hex: "#971937", name: "深红" },
  { code: "F8", hex: "#BC0028", name: "暗红" },
  { code: "F9", hex: "#E2677A", name: "玫瑰红" },
  { code: "F10", hex: "#8A4526", name: "棕红" },
  { code: "F11", hex: "#5A2121", name: "深棕红" },
  { code: "F12", hex: "#FD4E6A", name: "西瓜红" },
  { code: "F13", hex: "#F35744", name: "橙红" },
  { code: "F14", hex: "#FFA9AD", name: "浅珊瑚" },
  { code: "F15", hex: "#D30022", name: "鲜红" },
  { code: "F16", hex: "#FEC2A6", name: "浅橙红" },
  { code: "F17", hex: "#E69C79", name: "杏红" },
  { code: "F18", hex: "#D37C46", name: "土黄" },
  { code: "F19", hex: "#C1444A", name: " Indian Red" },
  { code: "F20", hex: "#CD9391", name: "灰玫瑰" },
  { code: "F21", hex: "#F7B4C6", name: "浅玫" },
  { code: "F22", hex: "#FDC0D0", name: "婴儿粉" },
  { code: "F23", hex: "#F67E66", name: "鲑鱼红" },
  { code: "F24", hex: "#E698AA", name: "淡玫" },
  { code: "F25", hex: "#E54B4F", name: "中红" },

  // G系列 - 棕色/米色
  { code: "G1", hex: "#FFE2CE", name: "浅杏" },
  { code: "G2", hex: "#FFC4AA", name: "杏色" },
  { code: "G3", hex: "#F4C3A5", name: "浅咖" },
  { code: "G4", hex: "#E1B383", name: "米色" },
  { code: "G5", hex: "#EDB045", name: "金黄" },
  { code: "G6", hex: "#E99C17", name: "土黄" },
  { code: "G7", hex: "#9D5B3E", name: "棕褐" },
  { code: "G8", hex: "#753832", name: "深棕" },
  { code: "G9", hex: "#E6B483", name: "小麦" },
  { code: "G10", hex: "#D98C39", name: "焦糖" },
  { code: "G11", hex: "#E0C593", name: "沙色" },
  { code: "G12", hex: "#FFC890", name: "浅焦糖" },
  { code: "G13", hex: "#B7714A", name: "咖啡" },
  { code: "G14", hex: "#8D614C", name: "深咖啡" },
  { code: "G15", hex: "#FCF9E0", name: "象牙" },
  { code: "G16", hex: "#F2D9BA", name: "奶油" },
  { code: "G17", hex: "#78524B", name: "巧克力" },
  { code: "G18", hex: "#FFE4CC", name: "极浅杏" },
  { code: "G19", hex: "#E07935", name: "南瓜" },
  { code: "G20", hex: "#A94023", name: "赭石" },
  { code: "G21", hex: "#B88558", name: "浅棕" },

  // H系列 - 灰色/黑白
  { code: "H1", hex: "#FDFBFF", name: "纯白" },
  { code: "H2", hex: "#FEFFFF", name: "雪白" },
  { code: "H3", hex: "#B6B1BA", name: "浅灰" },
  { code: "H4", hex: "#89858C", name: "中灰" },
  { code: "H5", hex: "#48464E", name: "深灰" },
  { code: "H6", hex: "#2F2B2F", name: "炭灰" },
  { code: "H7", hex: "#000000", name: "纯黑" },
  { code: "H8", hex: "#E7D6DB", name: "灰粉" },
  { code: "H9", hex: "#EDEDED", name: "银白" },
  { code: "H10", hex: "#EEE9EA", name: "珍珠" },
  { code: "H11", hex: "#CECDD5", name: "云灰" },
  { code: "H12", hex: "#FFF5ED", name: "乳白" },
  { code: "H13", hex: "#F5ECD2", name: "米黄" },
  { code: "H14", hex: "#CFD7D3", name: "青灰" },
  { code: "H15", hex: "#98A6A8", name: "钢灰" },
  { code: "H16", hex: "#1D1414", name: "墨黑" },
  { code: "H17", hex: "#F1EDED", name: "极浅灰" },
  { code: "H18", hex: "#FFFDF0", name: "象牙白" },
  { code: "H19", hex: "#F6EFE2", name: "骨白" },
  { code: "H20", hex: "#949FA3", name: "石板灰" },
  { code: "H21", hex: "#FFFBE1", name: "奶油白" },
  { code: "H22", hex: "#CACAD4", name: "淡灰" },
  { code: "H23", hex: "#9A9D94", name: "橄榄灰" },

  // M系列 - 特殊色
  { code: "M1", hex: "#BCC6B8", name: "灰绿" },
  { code: "M2", hex: "#8AA386", name: "薄荷灰" },
  { code: "M3", hex: "#697D80", name: "蓝灰" },
  { code: "M4", hex: "#E3D2BC", name: "米灰" },
  { code: "M5", hex: "#D0CCAA", name: "黄灰" },
  { code: "M6", hex: "#B0A782", name: "驼色" },
  { code: "M7", hex: "#B4A497", name: "暖灰" },
  { code: "M8", hex: "#B38281", name: "玫瑰灰" },
  { code: "M9", hex: "#A58767", name: "棕灰" },
  { code: "M10", hex: "#C5B2BC", name: "紫灰" },
  { code: "M11", hex: "#9F7594", name: "暗紫灰" },
  { code: "M12", hex: "#644749", name: "深棕灰" },
  { code: "M13", hex: "#D19066", name: "橙棕" },
  { code: "M14", hex: "#C77362", name: "砖灰" },
  { code: "M15", hex: "#757D78", name: "冷灰" },

  // P系列 - 珍珠/荧光色
  { code: "P1", hex: "#FCF7F8", name: "珍珠白" },
  { code: "P2", hex: "#B0A9AC", name: "珍珠灰" },
  { code: "P3", hex: "#AFDCAB", name: "珍珠绿" },
  { code: "P4", hex: "#FEA49F", name: "珍珠粉" },
  { code: "P5", hex: "#EE8C3E", name: "珍珠橙" },
  { code: "P6", hex: "#5FD0A7", name: "珍珠青" },
  { code: "P7", hex: "#EB9270", name: "珍珠杏" },
  { code: "P8", hex: "#F0D958", name: "珍珠黄" },
  { code: "P9", hex: "#D9D9D9", name: "银灰" },
  { code: "P10", hex: "#D9C7EA", name: "珍珠紫" },
  { code: "P11", hex: "#F3ECC9", name: "珍珠米" },
  { code: "P12", hex: "#E6EEF2", name: "珍珠蓝" },
  { code: "P13", hex: "#AACBEF", name: "淡珍珠蓝" },
  { code: "P14", hex: "#337680", name: "深珍珠蓝" },
  { code: "P15", hex: "#668575", name: "珍珠青灰" },
  { code: "P16", hex: "#FEBF45", name: "荧光黄" },
  { code: "P17", hex: "#FEA324", name: "荧光橙" },
  { code: "P18", hex: "#FEB89F", name: "荧光粉" },
  { code: "P19", hex: "#FFFEEC", name: "荧光白" },
  { code: "P20", hex: "#FEBECF", name: "荧光玫" },
  { code: "P21", hex: "#ECBEBF", name: "荧光肤" },
  { code: "P22", hex: "#E4A89F", name: "荧光杏" },
  { code: "P23", hex: "#A56268", name: "荧光暗粉" },

  // Q系列 - 荧光色
  { code: "Q1", hex: "#F2A5E8", name: "荧光紫粉" },
  { code: "Q2", hex: "#E9EC91", name: "荧光黄绿" },
  { code: "Q3", hex: "#FFFF00", name: "荧光黄" },
  { code: "Q4", hex: "#FFEBFA", name: "荧光浅粉" },
  { code: "Q5", hex: "#76CEDE", name: "荧光蓝" },

  // R系列 - 常用色
  { code: "R1", hex: "#D50D21", name: "标准红" },
  { code: "R2", hex: "#F92F83", name: "标准玫" },
  { code: "R3", hex: "#FD8324", name: "标准橙" },
  { code: "R4", hex: "#F8EC31", name: "标准黄" },
  { code: "R5", hex: "#35C75B", name: "标准绿" },
  { code: "R6", hex: "#238891", name: "标准青" },
  { code: "R7", hex: "#19779D", name: "标准蓝" },
  { code: "R8", hex: "#1A60C3", name: "标准深蓝" },
  { code: "R9", hex: "#9A56B4", name: "标准紫" },
  { code: "R10", hex: "#FFDB4C", name: "亮黄" },
  { code: "R11", hex: "#FFEBFA", name: "浅粉白" },
  { code: "R12", hex: "#D8D5CE", name: "暖灰" },
  { code: "R13", hex: "#55514C", name: "深暖灰" },
  { code: "R14", hex: "#9FE4DF", name: "浅水青" },
  { code: "R15", hex: "#77CEE9", name: "浅天蓝" },
  { code: "R16", hex: "#3ECFCA", name: " turquoise" },
  { code: "R17", hex: "#4A867A", name: "深青绿" },
  { code: "R18", hex: "#7FCD9D", name: "浅海绿" },
  { code: "R19", hex: "#CDE55D", name: "黄绿" },
  { code: "R20", hex: "#E8C7B4", name: "浅肤" },
  { code: "R21", hex: "#AD6F3C", name: "中棕" },
  { code: "R22", hex: "#6C372F", name: "红棕" },
  { code: "R23", hex: "#FEB872", name: "杏橙" },
  { code: "R24", hex: "#F3C1C0", name: "浅肤粉" },
  { code: "R25", hex: "#C9675E", name: "砖红" },
  { code: "R26", hex: "#D293BE", name: "浅紫红" },
  { code: "R27", hex: "#EA8CB1", name: "桃粉色" },
  { code: "R28", hex: "#9C87D6", name: "淡紫蓝" },

  // T系列 - 白色
  { code: "T1", hex: "#FFFFFF", name: "纯白" },

  // Y系列 - 特殊色
  { code: "Y1", hex: "#FD6FB4", name: "糖果粉" },
  { code: "Y2", hex: "#FEB481", name: "糖果橙" },
  { code: "Y3", hex: "#D7FAA0", name: "糖果绿" },
  { code: "Y4", hex: "#8BDBFA", name: "糖果蓝" },
  { code: "Y5", hex: "#E987EA", name: "糖果紫" },

  // ZG系列 - 珠光色
  { code: "ZG1", hex: "#DAABB3", name: "珠光粉" },
  { code: "ZG2", hex: "#D6AA87", name: "珠光金" },
  { code: "ZG3", hex: "#C1BD8D", name: "珠光黄" },
  { code: "ZG4", hex: "#96869F", name: "珠光紫" },
  { code: "ZG5", hex: "#8490A6", name: "珠光蓝" },
  { code: "ZG6", hex: "#94BFE2", name: "珠光天蓝" },
  { code: "ZG7", hex: "#E2A9D2", name: "珠光玫" },
  { code: "ZG8", hex: "#AB91C0", name: "珠光淡紫" },
];

// 处理色号数据，添加RGB值
export const mardColors: MardColor[] = mardColorData.map((color) => {
  const rgb = hexToRgb(color.hex);
  return {
    ...color,
    ...rgb,
  };
});

// 常用48色
export const common48Colors: MardColor[] = mardColors.filter((c) =>
  [
    "A1",
    "A5",
    "A10",
    "A14",
    "B4",
    "B8",
    "B12",
    "B15",
    "C5",
    "C7",
    "C8",
    "C16",
    "D5",
    "D7",
    "D18",
    "E4",
    "E6",
    "F4",
    "F5",
    "F8",
    "G4",
    "G8",
    "G13",
    "H1",
    "H3",
    "H4",
    "H5",
    "H7",
    "R1",
    "R3",
    "R4",
    "R5",
    "R7",
    "R8",
    "R9",
    "T1",
    "E12",
    "C4",
    "B2",
    "A3",
    "D2",
    "G2",
    "F2",
    "E2",
    "C2",
    "B5",
    "A7",
    "G6",
    "F10",
  ].includes(c.code)
);

// 常用24色
export const common24Colors: MardColor[] = mardColors.filter((c) =>
  [
    "H1",
    "H7",
    "R4",
    "R5",
    "R7",
    "R8",
    "R1",
    "R3",
    "A10",
    "A14",
    "B8",
    "B12",
    "C5",
    "C8",
    "D5",
    "D7",
    "E4",
    "E6",
    "F4",
    "F5",
    "G4",
    "G8",
    "H3",
    "H5",
  ].includes(c.code)
);

// 根据色号获取颜色
export function getColorByCode(code: string): MardColor | undefined {
  return mardColors.find((c) => c.code === code);
}

// 查找最近的颜色
export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: MardColor[] = mardColors
): MardColor {
  let minDistance = Infinity;
  let nearestColor = palette[0];

  for (const color of palette) {
    const dr = r - color.r;
    const dg = g - color.g;
    const db = b - color.b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);

    if (distance < minDistance) {
      minDistance = distance;
      nearestColor = color;
    }
  }

  return nearestColor;
}
