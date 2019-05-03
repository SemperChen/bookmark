create table users(
    id INT(5) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(18),
    password VARCHAR(50),
    collection TEXT
);
create table videos(
    id INT(5) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    author VARCHAR(50),
    img VARCHAR(200),
    intro TEXT,
    viewersCount INT(10),
    score FLOAT(3,1),
    video VARCHAR(100)
);
INSERT INTO videos(title,author,img,intro,viewersCount,score,video) VALUES('PHP7进阶到架构实战','edgar a. guest','https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLDicmEiaDlLpibia1udcZShSLzsOU187sxIU10NKktXxmRXJJoAiaiagSKuh58ImsOPPaw3g/356?tp=webp','本套AE入门视频教程特邀请了经验丰富的胡老师为大家授课，希望大家从中体验AE的魅力，掌握这一前沿的技术。After Effects简称AE,是Adobe公司推出的一款图形视频处理软件，适用于从事设计和视频特技的机构，包括电视台、动画制作公司、个人后期制作工作室以及多媒体工作室。目前是十分流行火爆的后期制作软件，许多电影特效，电视广告、片头动画都出自AE合成。',200,4.8,'https://media.w3.org/2010/05/sintel/trailer.mp4');
