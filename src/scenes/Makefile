TARGETS := $(wildcard map_*.ts)

all: $(TARGETS)

map_%.ts: ../../assets/map_%.gltf
	@echo "$< → $@"
	@cat $< | node gltf2map.cjs $* > $@
	@npx prettier --loglevel=silent --write $@
