.PHONY: test clean

test:
	$(MAKE) -C ./test test

clean:
	$(MAKE) -C ./test clean
