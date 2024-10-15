<template>
	<div class="tree">
		<div class="tree__count">Сумма каунтов: {{ countItems }}</div>
		<v-checkbox
			class="tree__empty"
			label="Отображать пустые рубрики"
			v-model="isAllowEmpty"
		/>
		<v-treeview
			:select-strategy="'independent'"
			selectable
			:items="items"
			item-value="id"
			v-model:selected="selected"
		>
			<template v-slot:title="{ item }">
				<a
					:href="`https://www.klerk.ru${item.url}`"
					v-if="item.url"
					target="_blank"
					>{{ item.title }}</a
				>
				<span v-else>{{ item.title }}</span>
			</template>
		</v-treeview>
	</div>
</template>

<script setup>
	import { VTreeview } from "vuetify/labs/VTreeview";
	import { useTreeStore } from "@/stores/tree";
	import { storeToRefs } from "pinia";
	import { VCheckbox } from "vuetify/components";

	const treeStore = useTreeStore();
	const { items, selected, countItems, isAllowEmpty } = storeToRefs(treeStore);

	treeStore.loadRubrics();

	watch(
		() => isAllowEmpty.value,
		() => {
			treeStore.loadRubrics();
		}
	);
	console.log(items.value, "items");

	// 		<template v-slot:prepend="{ item }">
	// 			<v-checkbox
	// 				class="tree__checkbox"
	// 				v-model="item.selected"
	// 				v-if="item.children"
	// 			/>
	// 		</template>
</script>

<style lang="scss">
	@import url(./Tree.scss);
</style>
