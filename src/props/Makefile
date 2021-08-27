TARGETS := $(wildcard prop_*.ts)

all: $(TARGETS)

prop_%.ts: ../../assets/%.gltf
	@echo "$< → $@"
	@cat $< | node gltf2prop.cjs $* > $@
