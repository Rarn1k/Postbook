# Generated by Django 4.2 on 2023-04-28 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_post', '0001_initial'),
        ('core_user', '0003_alter_user_created_alter_user_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='post_liked',
            field=models.ManyToManyField(related_name='lyked_by', to='core_post.post'),
        ),
    ]
