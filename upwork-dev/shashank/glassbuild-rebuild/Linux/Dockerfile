FROM centos:7
RUN yum install libfreetype.so.6 -y yum install libpthread.so.0 -y yum install fontconfig -y 
COPY ["test/glasswallCLI"           , "/usr/bin"        ] 
COPY ["Library/libglasswall.classic.so", "/usr/lib"        ]
COPY ["test/Configs/*"              , "/home/glasswall/"]
RUN mkdir input
COPY ["input/tobereplaced"              , "/input"]
# RUN mkdir output
RUN ln -s /usr/lib/libglasswall.classic.so /usr/bin/libglasswall.classic.so
RUN ldconfig
RUN chmod +x /usr/bin/glasswallCLI
CMD glasswallCLI -config=/home/glasswall/Config.ini -xmlconfig=/home/glasswall/Config.xml
