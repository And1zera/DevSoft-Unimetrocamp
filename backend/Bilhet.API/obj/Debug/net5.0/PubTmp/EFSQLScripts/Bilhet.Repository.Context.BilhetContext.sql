IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210928225632_Adicionar_Evento')
BEGIN
    CREATE TABLE [Evento] (
        [Id] uniqueidentifier NOT NULL,
        [Titulo] nvarchar(255) NOT NULL,
        [Preco] decimal(18,2) NOT NULL,
        [QtdIngresso] int NOT NULL,
        [URLImage] nvarchar(255) NOT NULL,
        [Data] datetime2 NOT NULL,
        [Endereco] nvarchar(255) NOT NULL,
        [DataHoraCriacao] datetime2 NOT NULL,
        [DataHoraAlteracao] datetime2 NULL,
        [UsuarioIdCriacao] uniqueidentifier NOT NULL,
        [UsuarioIdAlteracao] uniqueidentifier NULL,
        [Ativo] bit NOT NULL,
        CONSTRAINT [PK_Evento] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210928225632_Adicionar_Evento')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210928225632_Adicionar_Evento', N'5.0.10');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930000720_Adicionar_Bilhete')
BEGIN
    CREATE TABLE [Bilhete] (
        [Id] uniqueidentifier NOT NULL,
        [EventoId] uniqueidentifier NOT NULL,
        [RG] nvarchar(12) NOT NULL,
        [Preco] decimal(18,2) NOT NULL,
        [Senha] nvarchar(6) NOT NULL,
        [DataHoraCriacao] datetime2 NOT NULL,
        [DataHoraAlteracao] datetime2 NULL,
        [UsuarioIdCriacao] uniqueidentifier NOT NULL,
        [UsuarioIdAlteracao] uniqueidentifier NULL,
        [Ativo] bit NOT NULL,
        CONSTRAINT [PK_Bilhete] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Bilhete_Evento_EventoId] FOREIGN KEY ([EventoId]) REFERENCES [Evento] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930000720_Adicionar_Bilhete')
BEGIN
    CREATE INDEX [IX_Bilhete_EventoId] ON [Bilhete] ([EventoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930000720_Adicionar_Bilhete')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210930000720_Adicionar_Bilhete', N'5.0.10');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930224737_Alteracao_Bilhete_Primary_key')
BEGIN
    ALTER TABLE [Bilhete] DROP CONSTRAINT [PK_Bilhete];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930224737_Alteracao_Bilhete_Primary_key')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Bilhete]') AND [c].[name] = N'Senha');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Bilhete] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Bilhete] ALTER COLUMN [Senha] nvarchar(450) NOT NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930224737_Alteracao_Bilhete_Primary_key')
BEGIN
    ALTER TABLE [Bilhete] ADD CONSTRAINT [PK_Bilhete] PRIMARY KEY ([Id], [Senha]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210930224737_Alteracao_Bilhete_Primary_key')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210930224737_Alteracao_Bilhete_Primary_key', N'5.0.10');
END;
GO

COMMIT;
GO

