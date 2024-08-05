CREATE TABLE `csv_file` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`file` blob NOT NULL,
	`size` text NOT NULL,
	`workspace_id` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE no action
);
