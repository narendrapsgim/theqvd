XCOMM $XFree86: xc/lib/font/X-TrueType/ARABIC/Imakefile.inc,v 1.1 1999/03/28 15:31:37 dawes Exp $

#define ModuleName ARABIC
MODULENAME = ModuleName
MODULESRCDIR= $(XTTSOURCEDIR)/$(MODULENAME)

SRCS =	main.c MULEARABICtoUCS2.c CP1256toUCS2.c XATERMtoUCS2.c
OBJS =	main.o MULEARABICtoUCS2.o CP1256toUCS2.o XATERMtoUCS2.o

LinkSourceFile(main.c,$(MODULESRCDIR))
LinkSourceFile(MULEARABICtoUCS2.c,$(MODULESRCDIR))
LinkSourceFile(CP1256toUCS2.c,$(MODULESRCDIR))
LinkSourceFile(XATERMtoUCS2.c,$(MODULESRCDIR))